import { NextResponse } from "next/server"

import { ASSISTANT_MODEL } from "@/lib/assistant/config"
import { LIMIT_MESSAGE, reserveAssistantMessage } from "@/lib/assistant/budget"
import { buildSystemPrompt } from "@/lib/assistant/prompt"
import {
  CHAT_LIMIT,
  MAX_HISTORY,
  MAX_MESSAGE_LENGTH,
  isRateLimited,
} from "@/lib/assistant/rate-limit"
import { CRISIS_RESPONSE, isCrisisMessage } from "@/lib/assistant/safety"
import { getCoachingPlans } from "@/sanity/queries"

export const runtime = "nodejs"
export const maxDuration = 60

type ChatMessage = { role: "user" | "assistant"; content: string }

const FALLBACK_REPLY =
  "I'm sorry — I hit a snag while putting that answer together. Please try again, or reach our team through the Contact page and a person will follow up."

function textStream(text: string) {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text))
      controller.close()
    },
  })
}

function streamResponse(stream: ReadableStream<Uint8Array>, crisis = false) {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
      ...(crisis ? { "X-Assistant-Safety": "crisis" } : {}),
    },
  })
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 100_000) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 })
  }

  const body = await request.json().catch(() => null)
  const rawMessages = (body as { messages?: unknown } | null)?.messages
  const page =
    typeof (body as { page?: unknown } | null)?.page === "string"
      ? ((body as { page: string }).page || "").slice(0, 200)
      : undefined

  if (!Array.isArray(rawMessages)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 })
  }

  const messages: ChatMessage[] = rawMessages
    .filter(
      (message): message is ChatMessage =>
        Boolean(message) &&
        typeof message === "object" &&
        ((message as ChatMessage).role === "user" ||
          (message as ChatMessage).role === "assistant") &&
        typeof (message as ChatMessage).content === "string" &&
        (message as ChatMessage).content.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 })
  }

  if (isRateLimited(request, CHAT_LIMIT)) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message: "Too many messages. Please take a short break and try again.",
      },
      { status: 429 }
    )
  }

  // A fixed response guarantees crisis resources even if the model call fails.
  if (isCrisisMessage(messages[messages.length - 1].content)) {
    return streamResponse(textStream(CRISIS_RESPONSE), true)
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.warn("[assistant] OPENAI_API_KEY not set — chat is unavailable.")
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "H.U.M.A.N. isn't available right now. You can still reach our team through the Contact page.",
      },
      { status: 503 }
    )
  }

  if (!(await reserveAssistantMessage())) {
    return NextResponse.json({ error: "limit_reached", message: LIMIT_MESSAGE }, { status: 503 })
  }

  const plans = await getCoachingPlans()

  let upstream: Response
  try {
    upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: ASSISTANT_MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt(plans, page) },
          ...messages,
        ],
        temperature: 0.5,
        max_tokens: 700,
        stream: true,
      }),
      signal: request.signal,
    })
  } catch (error) {
    if (!request.signal.aborted)
      console.error("[assistant] OpenAI request failed:", error)
    return NextResponse.json({ error: "upstream_unavailable" }, { status: 502 })
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "")
    console.error(
      "[assistant] OpenAI returned",
      upstream.status,
      detail.slice(0, 500)
    )
    return NextResponse.json({ error: "upstream_unavailable" }, { status: 502 })
  }

  const reader = upstream.body.getReader()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ""
  let sentAny = false

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      function handleEvent(event: string) {
        const dataLine = event
          .split("\n")
          .find((line) => line.startsWith("data:"))
        if (!dataLine) return

        const data = dataLine.slice(5).trim()
        if (!data || data === "[DONE]") return

        try {
          const parsed = JSON.parse(data) as {
            choices?: { delta?: { content?: string } }[]
          }
          const delta = parsed.choices?.[0]?.delta?.content
          if (delta) {
            sentAny = true
            controller.enqueue(encoder.encode(delta))
          }
        } catch {
          // A malformed event shouldn't tear down an otherwise good stream.
        }
      }

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          // OpenAI separates events with \n\n, but some proxies use \r\n.
          buffer = (buffer + decoder.decode(value, { stream: true })).replace(
            /\r\n/g,
            "\n"
          )
          const events = buffer.split("\n\n")
          buffer = events.pop() ?? ""

          for (const event of events) handleEvent(event)
        }

        // Process a final event that arrived without a trailing blank line.
        if (buffer.trim()) handleEvent(buffer)
        if (!sentAny) controller.enqueue(encoder.encode(FALLBACK_REPLY))
        controller.close()
      } catch (error) {
        if (request.signal.aborted) {
          controller.close()
          return
        }
        console.error("[assistant] stream failed:", error)
        try {
          // If part of the answer already reached the visitor, keep it rather
          // than appending an apology to a half-finished reply.
          if (!sentAny) controller.enqueue(encoder.encode(FALLBACK_REPLY))
          controller.close()
        } catch {
          controller.error(error)
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {})
    },
  })

  return streamResponse(stream)
}

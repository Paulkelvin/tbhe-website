"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  PaperPlaneRight,
  Stop,
  UserCircle,
  WarningCircle,
  X,
} from "@phosphor-icons/react"

import { AssistantText } from "@/components/assistant/assistant-message"
import {
  HumanAvatar,
  type AvatarMood,
} from "@/components/assistant/human-avatar"
import { LeadForm } from "@/components/assistant/lead-form"
import { Button } from "@/components/ui/button"
import { ASSISTANT_NAME, GREETING, SUGGESTIONS } from "@/lib/assistant/paths"
import { BUSINESS_CONTACT } from "@/lib/content"
import { cn } from "@/lib/utils"

const EASE = [0.4, 0, 0.2, 1] as const
const MAX_INPUT = 1500

type ChatMessage = { id: string; role: "user" | "assistant"; content: string }
type AssistantError = { code: string; message: string }

export function HumanAssistant() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  const [open, setOpen] = useState(false)
  const [view, setView] = useState<"chat" | "lead">("chat")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [streamText, setStreamText] = useState("")
  const [error, setError] = useState<AssistantError | null>(null)
  const [unavailable, setUnavailable] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const [stickToBottom, setStickToBottom] = useState(true)
  const [mood, setMood] = useState<AvatarMood>("idle")

  const panelRef = useRef<HTMLDivElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const streamRef = useRef("")
  const idRef = useRef(0)
  const moodTimerRef = useRef<number | null>(null)

  function nextId() {
    idRef.current += 1
    return `human-${idRef.current}`
  }

  function clearMoodTimer() {
    if (moodTimerRef.current) {
      window.clearTimeout(moodTimerRef.current)
      moodTimerRef.current = null
    }
  }

  function setTemporaryMood(next: AvatarMood, ms: number) {
    clearMoodTimer()
    setMood(next)
    moodTimerRef.current = window.setTimeout(() => setMood("idle"), ms)
  }

  const closePanel = useCallback(() => {
    abortRef.current?.abort()
    clearMoodTimer()
    setOpen(false)
    setView("chat")
    setMood("idle")
    window.requestAnimationFrame(() => launcherRef.current?.focus())
  }, [])

  // Escape and a click outside both close the widget, without blocking the
  // page behind it.
  useEffect(() => {
    if (!open) return

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closePanel()
    }
    function handlePointerDown(event: PointerEvent) {
      if (!panelRef.current?.contains(event.target as Node)) closePanel()
    }

    document.addEventListener("keydown", handleKey)
    document.addEventListener("pointerdown", handlePointerDown)
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [open, closePanel])

  // A link inside the chat can navigate; close so it never sits over the
  // page the visitor just chose.
  useEffect(() => {
    abortRef.current?.abort()
    setOpen(false)
    setView("chat")
  }, [pathname])

  // Keep the page still while the chat is open; only the conversation
  // scrolls, inside its own panel.
  useEffect(() => {
    if (!open) return
    const bodyOverflow = document.body.style.overflow
    const htmlOverflow = document.documentElement.style.overflow
    const htmlGutter = document.documentElement.style.scrollbarGutter

    // Reserve the scrollbar's space so hiding it doesn't shift the page.
    document.documentElement.style.scrollbarGutter = "stable"
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = bodyOverflow
      document.documentElement.style.overflow = htmlOverflow
      document.documentElement.style.scrollbarGutter = htmlGutter
    }
  }, [open])

  // Wave once when the greeting appears, never mid-conversation.
  useEffect(() => {
    if (!open) {
      setMood("idle")
      return
    }
    if (messages.length > 0) return

    setMood("greeting")
    const timer = window.setTimeout(() => setMood("idle"), 2200)
    return () => window.clearTimeout(timer)
  }, [open, messages.length])

  useEffect(() => {
    return () => {
      clearMoodTimer()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => {
      if (view === "lead") {
        document.getElementById("assistant-name")?.focus()
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        inputRef.current?.focus()
      } else {
        panelRef.current?.focus()
      }
    }, 160)
    return () => window.clearTimeout(timer)
  }, [open, view])

  useEffect(() => {
    const element = inputRef.current
    if (!element) return
    element.style.height = "0px"
    element.style.height = `${Math.min(element.scrollHeight, 112)}px`
  }, [input, open, view])

  useEffect(() => {
    const element = scrollRef.current
    if (!element || view === "lead") return
    if (messages.length === 0 && !streaming) {
      element.scrollTop = 0
      return
    }
    if (stickToBottom) element.scrollTop = element.scrollHeight
  }, [messages, streamText, view, open, stickToBottom, streaming])

  async function runReply(history: ChatMessage[]) {
    clearMoodTimer()
    setMood("thinking")
    setStreaming(true)
    setStreamText("")
    setError(null)
    setStickToBottom(true)
    setAnnouncement(`${ASSISTANT_NAME} is typing.`)
    streamRef.current = ""

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
          page: pathname,
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string
          message?: string
        } | null
        if (data?.error === "not_configured") setUnavailable(true)
        setError({
          code: data?.error ?? "error",
          message:
            data?.message ??
            "H.U.M.A.N. couldn't reply just now. Please try again in a moment.",
        })
        setMood("concerned")
        return
      }

      if (!response.body) throw new Error("No response body")

      const crisis = response.headers.get("X-Assistant-Safety") === "crisis"
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let full = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        streamRef.current = full
        setStreamText(full)
      }

      full = full.trim()
      if (full) {
        setMessages((current) => [
          ...current,
          { id: nextId(), role: "assistant", content: full },
        ])
        setAnnouncement(full.replace(/[*_#[\]]/g, "").slice(0, 400))
        setTemporaryMood(crisis ? "concerned" : "happy", crisis ? 5000 : 1800)
      }
    } catch (caught) {
      if ((caught as Error).name === "AbortError") {
        const partial = streamRef.current.trim()
        if (partial) {
          setMessages((current) => [
            ...current,
            { id: nextId(), role: "assistant", content: partial },
          ])
        }
        setMood("idle")
        return
      }

      setError({
        code: "error",
        message:
          "Something went wrong on our end. Please try again, or reach the team through the Contact page.",
      })
      setMood("concerned")
    } finally {
      setStreaming(false)
      setStreamText("")
      streamRef.current = ""
      abortRef.current = null
      setStickToBottom(true)
    }
  }

  function sendMessage(text: string) {
    const content = text.trim().slice(0, MAX_INPUT)
    if (!content || streaming) return

    setInput("")
    const userMessage: ChatMessage = {
      id: nextId(),
      role: "user",
      content,
    }
    const next = [...messages, userMessage]
    setMessages(next)
    setStickToBottom(true)
    void runReply(next)
  }

  function retry() {
    if (messages.length && messages[messages.length - 1].role === "user") {
      void runReply(messages)
    }
  }

  function stopGenerating() {
    abortRef.current?.abort()
  }

  function handleComposerKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    )
      return
    const desktop = window.matchMedia("(min-width: 640px)").matches
    if (desktop || event.ctrlKey || event.metaKey) {
      event.preventDefault()
      sendMessage(input)
    }
  }

  const latestUserMessage = Boolean(
    messages.length && messages[messages.length - 1].role === "user"
  )

  return (
    <>
      <AnimatePresence>
        {!open ? (
          <motion.button
            key="human-launcher"
            ref={launcherRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="human-assistant-panel"
            aria-label={`Ask ${ASSISTANT_NAME}, the virtual assistant`}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex size-16 items-center justify-center rounded-full border border-hairline bg-surface-card shadow-[0_16px_36px_-16px_rgba(37,24,39,0.55)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none sm:right-6 sm:bottom-6"
          >
            <span className="pointer-events-none absolute right-0 bottom-full mb-2 whitespace-nowrap rounded-full border border-hairline bg-surface-card/95 px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] text-ink shadow-[0_6px_18px_-8px_rgba(37,24,39,0.4)] backdrop-blur">
              Ask {ASSISTANT_NAME}
            </span>
            <HumanAvatar size={52} />
            <span className="absolute right-1.5 bottom-1.5 size-3 rounded-full border-2 border-surface-card bg-[#557521]" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="human-panel"
            id="human-assistant-panel"
            ref={panelRef}
            role="dialog"
            aria-labelledby="human-assistant-title"
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="fixed inset-x-2 bottom-2 z-[70] flex h-[min(80dvh,640px)] flex-col overflow-hidden rounded-3xl border border-hairline bg-surface-card shadow-[0_34px_70px_-24px_rgba(37,24,39,0.45)] focus:outline-none sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-[min(620px,calc(100dvh-3rem))] sm:w-[380px]"
          >
            <p role="status" aria-live="polite" className="sr-only">
              {announcement}
            </p>

            <header className="flex items-center gap-3 border-b border-hairline px-4 py-3">
              <HumanAvatar size={44} mood={mood} />
              <div className="flex min-w-0 flex-1 items-baseline gap-2">
                <h2 id="human-assistant-title" className="text-h3-alt text-ink">
                  {ASSISTANT_NAME}
                </h2>
                {streaming ? (
                  <span className="text-xs font-medium text-muted-ink">
                    Typing…
                  </span>
                ) : null}
              </div>
              {view === "chat" ? (
                <button
                  type="button"
                  onClick={() => setView("lead")}
                  aria-label="Talk to a person"
                  title="Talk to a person"
                  className="flex size-10 items-center justify-center rounded-full text-muted-ink transition-colors hover:bg-canvas-soft hover:text-ink focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <UserCircle size={20} />
                </button>
              ) : null}
              <button
                type="button"
                onClick={closePanel}
                aria-label="Close the assistant"
                className="flex size-10 items-center justify-center rounded-full text-muted-ink transition-colors hover:bg-canvas-soft hover:text-ink focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col">
              {view === "lead" ? (
                <LeadForm onBack={() => setView("chat")} page={pathname} />
              ) : (
                <>
                  <div
                    ref={scrollRef}
                    role="region"
                    aria-label="Conversation"
                    tabIndex={0}
                    onScroll={(event) => {
                      const element = event.currentTarget
                      setStickToBottom(
                        element.scrollHeight -
                          element.scrollTop -
                          element.clientHeight <
                          96
                      )
                    }}
                    className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset focus-visible:outline-none"
                  >
                    {messages.length === 0 ? (
                      <Welcome onPick={sendMessage} />
                    ) : null}

                    <div className="space-y-3">
                      {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                      ))}

                      {streaming ? (
                        streamText ? (
                          <StreamingBubble
                            text={streamText}
                            reduceMotion={Boolean(reduceMotion)}
                          />
                        ) : (
                          <TypingBubble reduceMotion={Boolean(reduceMotion)} />
                        )
                      ) : null}

                      {error ? (
                        <ErrorNotice
                          error={error}
                          canRetry={latestUserMessage}
                          onRetry={retry}
                        />
                      ) : null}
                    </div>
                  </div>

                  {unavailable ? (
                    <div className="border-t border-hairline px-4 py-4 text-center">
                      <p className="text-xs text-body">
                        Chat is offline right now, but our team can still help.
                      </p>
                      <div className="mt-2.5 flex flex-wrap justify-center gap-2">
                        <Button asChild size="sm">
                          <Link href="/contact">Contact us</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <a href={`mailto:${BUSINESS_CONTACT.email}`}>
                            Email us
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-hairline px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                      <form
                        onSubmit={(event) => {
                          event.preventDefault()
                          sendMessage(input)
                        }}
                        className="flex items-end gap-2 rounded-2xl border border-hairline-strong bg-canvas p-1.5 transition-colors focus-within:border-primary/50 focus-within:ring-[3px] focus-within:ring-primary/10"
                      >
                        <label
                          htmlFor="human-assistant-input"
                          className="sr-only"
                        >
                          Message {ASSISTANT_NAME}
                        </label>
                        <textarea
                          id="human-assistant-input"
                          ref={inputRef}
                          rows={1}
                          value={input}
                          maxLength={MAX_INPUT}
                          onChange={(event) => setInput(event.target.value)}
                          onKeyDown={handleComposerKeyDown}
                          placeholder="Type your message…"
                          className="max-h-28 min-h-9 w-full flex-1 resize-none bg-transparent px-2.5 py-2 text-base leading-snug text-ink placeholder:text-muted-ink focus:outline-none"
                        />

                        {streaming ? (
                          <button
                            type="button"
                            onClick={stopGenerating}
                            aria-label="Stop generating a reply"
                            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-hairline-strong bg-surface-card text-ink transition-colors hover:bg-canvas-soft focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                          >
                            <Stop size={15} weight="fill" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={!input.trim()}
                            aria-label="Send message"
                            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                          >
                            <PaperPlaneRight size={18} weight="fill" />
                          </button>
                        )}
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[86%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-[0.9375rem] leading-[1.65] whitespace-pre-wrap text-primary-foreground">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-canvas-soft px-3.5 py-2.5 text-[0.9375rem] leading-[1.65] text-ink">
        <AssistantText text={message.content} />
      </div>
    </div>
  )
}

function StreamingBubble({
  text,
  reduceMotion,
}: {
  text: string
  reduceMotion: boolean
}) {
  return (
    <div className="flex">
      <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-canvas-soft px-3.5 py-2.5 text-[0.9375rem] leading-[1.65] text-ink">
        <AssistantText text={text} />
        <span
          aria-hidden
          className={cn(
            "ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary/60",
            !reduceMotion && "animate-pulse"
          )}
        />
      </div>
    </div>
  )
}

function TypingBubble({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="flex">
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-canvas-soft px-3.5 py-3">
        <span className="flex items-center gap-1" aria-hidden>
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={cn(
                "size-1.5 rounded-full bg-muted-ink/60",
                !reduceMotion && "animate-bounce"
              )}
              style={{ animationDelay: `${dot * 120}ms` }}
            />
          ))}
        </span>
      </div>
    </div>
  )
}

function ErrorNotice({
  error,
  canRetry,
  onRetry,
}: {
  error: AssistantError
  canRetry: boolean
  onRetry: () => void
}) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-error/25 bg-error/5 p-3 text-xs leading-relaxed text-body"
    >
      <div className="flex gap-2">
        <WarningCircle size={16} className="mt-0.5 shrink-0 text-error" />
        <div>
          <p>{error.message}</p>
          {error.code === "not_configured" ? (
            <p className="mt-1">
              Email{" "}
              <a
                href={`mailto:${BUSINESS_CONTACT.email}`}
                className="font-semibold text-primary underline underline-offset-2"
              >
                {BUSINESS_CONTACT.email}
              </a>{" "}
              or use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary underline underline-offset-2"
              >
                Contact page
              </Link>
              .
            </p>
          ) : null}
          {canRetry && error.code !== "not_configured" ? (
            <button
              type="button"
              onClick={onRetry}
              className="mt-1.5 font-semibold text-primary underline underline-offset-2 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Try again
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function Welcome({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div>
      <div className="rounded-2xl rounded-tl-md bg-canvas-soft px-4 py-3 text-[0.9375rem] leading-[1.65] text-ink">
        {GREETING}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.label}
            type="button"
            onClick={() => onPick(suggestion.prompt)}
            className="rounded-full border border-hairline bg-surface-card px-3 py-1.5 text-xs font-semibold text-body transition-colors hover:border-primary/40 hover:bg-lavender-surface hover:text-ink focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {suggestion.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-ink">
        An AI guide — not a person. Please don&apos;t share medical records, IEP
        documents, or your child&apos;s full name.{" "}
        <Link
          href="/privacy"
          className="font-semibold text-primary underline underline-offset-2"
        >
          Privacy
        </Link>
      </p>
    </div>
  )
}

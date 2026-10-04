import { NextResponse } from "next/server"

import { sendFormNotification } from "@/lib/email"
import { cleanFields, isHoneypotFilled, isRateLimited, isValidEmail } from "@/lib/form-guard"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }
  if (isHoneypotFilled(body)) return NextResponse.json({ ok: true })
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 })
  }

  const { name, email, org, eventDate, topic, audienceSize, message } = cleanFields(body, {
    name: 120,
    email: 254,
    org: 200,
    eventDate: 60,
    topic: 200,
    audienceSize: 60,
    message: 5000,
  })
  if (!name || !isValidEmail(email)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  const result = await sendFormNotification({
    subject: `New speaker booking request from ${name}`,
    fields: {
      Name: name,
      Email: email,
      "Organization / event name": org,
      "Preferred event date": eventDate,
      "Keynote topic": topic,
      "Estimated audience size": audienceSize,
      Message: message,
    },
    replyTo: email,
  })

  if (!result.sent && result.reason === "send_failed") {
    return NextResponse.json({ error: "Could not send request." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

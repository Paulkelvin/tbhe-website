import { NextResponse } from "next/server"

import { sendFormNotification } from "@/lib/email"
import { isHoneypotFilled, isRateLimited, isValidEmail } from "@/lib/form-guard"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Missing email address." }, { status: 400 })
  }
  if (isHoneypotFilled(body)) return NextResponse.json({ ok: true })
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 })
  }

  const email = typeof body.email === "string" ? body.email.trim() : ""
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const result = await sendFormNotification({
    subject: "New newsletter signup",
    fields: { Email: email },
    replyTo: email,
  })

  if (!result.sent && result.reason === "send_failed") {
    return NextResponse.json({ error: "Could not subscribe." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

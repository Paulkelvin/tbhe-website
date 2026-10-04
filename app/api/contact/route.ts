import { NextResponse } from "next/server"

import { sendFormNotification } from "@/lib/email"
import { cleanFields, isHoneypotFilled, isRateLimited, isValidEmail } from "@/lib/form-guard"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }
  // Pretend success so bots don't learn they were caught.
  if (isHoneypotFilled(body)) return NextResponse.json({ ok: true })
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 })
  }

  const { name, email, org, reason, message } = cleanFields(body, {
    name: 120,
    email: 254,
    org: 200,
    reason: 100,
    message: 5000,
  })
  if (!name || !isValidEmail(email)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  const result = await sendFormNotification({
    subject: `New contact form message from ${name}`,
    fields: {
      Name: name,
      Email: email,
      Organization: org,
      "Reason for contact": reason,
      Message: message,
    },
    replyTo: email,
  })

  if (!result.sent && result.reason === "send_failed") {
    return NextResponse.json({ error: "Could not send message." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

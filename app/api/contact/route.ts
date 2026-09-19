import { NextResponse } from "next/server"

import { sendFormNotification } from "@/lib/email"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body.name !== "string" || typeof body.email !== "string") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  const { name, email, org, reason, message } = body as Record<string, string>

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

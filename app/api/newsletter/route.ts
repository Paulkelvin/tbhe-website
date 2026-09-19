import { NextResponse } from "next/server"

import { sendFormNotification } from "@/lib/email"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body.email !== "string") {
    return NextResponse.json({ error: "Missing email address." }, { status: 400 })
  }

  const { email } = body as Record<string, string>

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

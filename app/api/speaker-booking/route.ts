import { NextResponse } from "next/server"

import { sendFormNotification } from "@/lib/email"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body.name !== "string" || typeof body.email !== "string") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  const { name, email, org, eventDate, topic, audienceSize, message } = body as Record<
    string,
    string
  >

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

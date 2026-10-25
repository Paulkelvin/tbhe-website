import { NextResponse } from "next/server"

import { SEND_ACKNOWLEDGMENT, inboxFor } from "@/lib/assistant/config"
import { sendAcknowledgment } from "@/lib/assistant/email"
import { inquiryByValue } from "@/lib/assistant/inquiry"
import { LEAD_LIMIT, isRateLimited } from "@/lib/assistant/rate-limit"
import { detailRows, sendEmail } from "@/lib/email"
import { cleanFields, isHoneypotFilled, isValidEmail } from "@/lib/form-guard"

const MAX = {
  name: 120,
  email: 254,
  role: 80,
  inquiry: 40,
  location: 120,
  timeline: 60,
  message: 3000,
  page: 200,
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 })
  }

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 })
  }

  if (isHoneypotFilled(body as Record<string, unknown>)) {
    return NextResponse.json({ ok: true })
  }
  if (isRateLimited(request, LEAD_LIMIT)) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message: "Too many messages. Please try again in a few minutes.",
      },
      { status: 429 }
    )
  }

  const fields = cleanFields(body as Record<string, unknown>, MAX)
  const inquiry = inquiryByValue(fields.inquiry) ?? inquiryByValue("other")!
  const consented =
    (body as { consent?: unknown }).consent === true ||
    (body as { consent?: unknown }).consent === "true" ||
    (body as { consent?: unknown }).consent === "on"

  if (!fields.name || !isValidEmail(fields.email) || !consented) {
    return NextResponse.json(
      {
        error: "invalid_request",
        message:
          "Please add your name, a valid email, and consent to be contacted.",
      },
      { status: 400 }
    )
  }

  const to = inboxFor(inquiry.inbox)
  if (!to) {
    console.warn(
      "[assistant] No inbox configured for lead — RESEND/CONTACT_TO_EMAIL missing.",
      { inquiry: inquiry.value }
    )
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Our contact inbox isn't configured yet. Please email us directly.",
      },
      { status: 503 }
    )
  }

  const result = await sendEmail({
    to,
    replyTo: fields.email,
    subject: `H.U.M.A.N. inquiry — ${inquiry.subject} (${fields.name.replace(/[\r\n]+/g, " ")})`,
    html: `<div style="background:#faf7f1;padding:24px;font-family:Helvetica,Arial,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6ddca;border-radius:16px;padding:24px;">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#763d8e;font-weight:bold;">H.U.M.A.N. website inquiry</p>
        <h1 style="margin:0 0 16px;font-size:20px;color:#251827;font-family:Georgia,serif;font-weight:normal;">${inquiry.subject}</h1>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #efe8d9;">${detailRows(
          {
            Name: fields.name,
            Email: fields.email,
            Role: fields.role,
            "Inquiry type": inquiry.label,
            Location: fields.location,
            Timeline: fields.timeline,
            Message: fields.message,
            "Page they were on": fields.page,
          }
        )}</table>
        <p style="margin:20px 0 0;font-size:12px;color:#6e6371;">Sent from the H.U.M.A.N. assistant. The visitor agreed to be contacted by email. Do not share this message outside the team.</p>
      </div>
    </div>`,
  })

  if (!result.sent) {
    if (result.reason === "not_configured") {
      return NextResponse.json(
        {
          error: "not_configured",
          message:
            "Our contact inbox isn't configured yet. Please email us directly.",
        },
        { status: 503 }
      )
    }
    return NextResponse.json(
      {
        error: "send_failed",
        message:
          "We couldn't send your message. Please try again or email us directly.",
      },
      { status: 502 }
    )
  }

  let acknowledgmentSent = false
  if (SEND_ACKNOWLEDGMENT) {
    const acknowledgment = await sendAcknowledgment({
      to: fields.email,
      name: fields.name,
      mission139:
        inquiry.inbox === "mission" ||
        inquiry.inbox === "family" ||
        inquiry.inbox === "partnerships",
    })
    acknowledgmentSent = acknowledgment.sent
    if (!acknowledgment.sent && acknowledgment.reason === "send_failed") {
      console.warn(
        "[assistant] Confirmation email failed for a lead; the team notification still sent."
      )
    }
  }

  return NextResponse.json({ ok: true, acknowledgmentSent })
}

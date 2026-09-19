import { Resend } from "resend"

// Env vars to set once available (per Paul: "I will get the envs later"):
// - RESEND_API_KEY: from resend.com
// - CONTACT_TO_EMAIL: the inbox all form submissions should land in
// - RESEND_FROM_EMAIL (optional): a verified sending address, e.g.
//   "TBHE Website <notifications@thebeautifullyhumaneducator.com>".
//   Falls back to Resend's shared sandbox sender, which works with no
//   domain verification but is fine for a low-volume notification inbox.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "TBHE Website <onboarding@resend.dev>"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function sendFormNotification({
  subject,
  fields,
  replyTo,
}: {
  subject: string
  fields: Record<string, string | undefined>
  replyTo?: string
}): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !toEmail) {
    console.warn(
      "[email] RESEND_API_KEY or CONTACT_TO_EMAIL not set — form submission was not emailed.",
      { subject, fields }
    )
    return { sent: false, reason: "not_configured" }
  }

  const rows = Object.entries(fields)
    .filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#7a6e7e;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#251827;font-size:14px;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
    )
    .join("")

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: toEmail,
    replyTo,
    subject,
    html: `<table cellpadding="0" cellspacing="0" style="font-family:sans-serif;">${rows}</table>`,
  })

  if (error) {
    console.error("[email] Resend send failed:", error)
    return { sent: false, reason: "send_failed" }
  }

  return { sent: true }
}

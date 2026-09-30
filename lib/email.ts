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

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — email was not sent.", { to, subject })
    return { sent: false, reason: "not_configured" }
  }

  const { error } = await new Resend(apiKey).emails.send({ from: FROM_EMAIL, to, replyTo, subject, html })
  if (error) {
    console.error("[email] Resend send failed:", error)
    return { sent: false, reason: "send_failed" }
  }
  return { sent: true }
}

export function detailRows(fields: Record<string, string | undefined>) {
  return Object.entries(fields)
    .filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#7a6e7e;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#251827;font-size:14px;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
    )
    .join("")
}

export function brandedEmail({ heading, intro, rows, cta }: { heading: string; intro: string; rows?: string; cta?: { label: string; href: string } }) {
  return `<div style="background:#faf7f1;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e6ddca;border-radius:16px;overflow:hidden;">
    <div style="background:#763d8e;padding:20px 28px;color:#ffffff;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:bold;">The Beautifully Human Educator</div>
    <div style="padding:28px;">
      <h1 style="margin:0 0 12px;font-size:22px;color:#251827;font-family:Georgia,serif;font-weight:normal;">${escapeHtml(heading)}</h1>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#5c525c;">${escapeHtml(intro)}</p>
      ${rows ? `<table cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #efe8d9;padding-top:12px;">${rows}</table>` : ""}
      ${cta ? `<p style="margin:24px 0 0;"><a href="${escapeHtml(cta.href)}" style="display:inline-block;background:#763d8e;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-size:14px;font-weight:bold;">${escapeHtml(cta.label)}</a></p>` : ""}
    </div>
  </div>
</div>`
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
  const toEmail = process.env.CONTACT_TO_EMAIL
  if (!toEmail) {
    console.warn("[email] CONTACT_TO_EMAIL not set — form submission was not emailed.", { subject, fields })
    return { sent: false, reason: "not_configured" }
  }

  return sendEmail({
    to: toEmail,
    subject,
    replyTo,
    html: `<table cellpadding="0" cellspacing="0" style="font-family:sans-serif;">${detailRows(fields)}</table>`,
  })
}

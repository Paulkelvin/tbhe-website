import { sendEmail } from "@/lib/email"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function acknowledgmentEmail({
  name,
  mission139,
}: {
  name: string
  mission139: boolean
}) {
  const safeName = escapeHtml(name)
  const brand = mission139 ? "Mission 139" : "The Beautifully Human Educator"
  const accent = mission139 ? "#557521" : "#763d8e"
  const body = mission139
    ? `<p style="margin:0 0 16px;">Hello ${safeName},</p>
       <p style="margin:0 0 16px;">Thank you for reaching out to Mission 139.</p>
       <p style="margin:0 0 16px;">We know that navigating educational systems and finding the right support for a child can sometimes feel overwhelming. We believe every child deserves to be seen, valued, and given meaningful opportunities to thrive.</p>
       <p style="margin:0 0 16px;">Your message has been received and will be reviewed with care.</p>
       <p style="margin:0 0 16px;">While submitting an inquiry does not guarantee services or financial assistance, we are committed to helping families understand the resources and pathways that may be available.</p>
       <p style="margin:0 0 8px;">With care,</p>
       <p style="margin:0;font-weight:bold;">The Mission 139 Team</p>
       <p style="margin:20px 0 0;font-style:italic;color:#6e6371;">Every child matters. Every voice deserves to be heard.</p>`
    : `<p style="margin:0 0 16px;">Hello ${safeName},</p>
       <p style="margin:0 0 16px;">Thank you for connecting with The Beautifully Human Educator!</p>
       <p style="margin:0 0 16px;">We believe meaningful educational transformation begins with recognizing the humanity of every learner, educator, and leader.</p>
       <p style="margin:0 0 16px;">We&rsquo;ve received your inquiry and look forward to learning more about how we may partner with you.</p>
       <p style="margin:0 0 16px;">A member of our team will review your message and follow up as soon as possible.</p>
       <p style="margin:0 0 8px;">With appreciation,</p>
       <p style="margin:0;font-weight:bold;">The Beautifully Human Educator Team</p>
       <p style="margin:20px 0 0;font-style:italic;color:#6e6371;">Excellence begins with humanity.</p>`

  return `<div style="background:#faf7f1;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e6ddca;border-radius:16px;overflow:hidden;">
    <div style="background:${accent};padding:20px 28px;color:#ffffff;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:bold;">${brand}</div>
    <div style="padding:28px;font-size:15px;line-height:1.65;color:#5c525c;">${body}</div>
  </div>
</div>`
}

export async function sendAcknowledgment({
  to,
  name,
  mission139,
}: {
  to: string
  name: string
  mission139: boolean
}) {
  return sendEmail({
    to,
    subject: mission139
      ? "We received your message — Mission 139"
      : "We received your message — The Beautifully Human Educator",
    html: acknowledgmentEmail({ name, mission139 }),
  })
}

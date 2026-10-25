import type { InquiryInbox } from "@/lib/assistant/inquiry"

// Inbox routing. Distinct branded inboxes can be configured later; until
// then every route falls back to CONTACT_TO_EMAIL so no inquiry is lost.
export function inboxFor(kind: InquiryInbox) {
  const fallback = process.env.CONTACT_TO_EMAIL

  switch (kind) {
    case "mission":
      return process.env.MISSION139_TO_EMAIL || fallback
    case "family":
      return process.env.MISSION139_FAMILY_TO_EMAIL || fallback
    case "partnerships":
      return process.env.PARTNERSHIPS_TO_EMAIL || fallback
    default:
      return process.env.BHE_TO_EMAIL || fallback
  }
}

export const ASSISTANT_MODEL = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini"
export const SEND_ACKNOWLEDGMENT =
  process.env.ASSISTANT_SEND_ACKNOWLEDGMENT !== "false"

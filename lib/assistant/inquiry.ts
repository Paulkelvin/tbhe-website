// Shared by the chat UI and the lead API — keep this file free of server-only
// imports so the client can use the same labels and routing keys.

export type InquiryInbox = "bhe" | "mission" | "family" | "partnerships"

export const INQUIRY_OPTIONS = [
  {
    value: "coaching",
    label: "Coaching, professional development, or consulting",
    inbox: "bhe",
    subject: "BHE coaching / consulting",
  },
  {
    value: "advocacy",
    label: "Advocacy, IEP, or 504 support",
    inbox: "mission",
    subject: "Mission 139 advocacy",
  },
  {
    value: "family-assistance",
    label: "Mission 139 family assistance",
    inbox: "family",
    subject: "Mission 139 family assistance",
  },
  {
    value: "speaking",
    label: "Speaking, workshop, or event",
    inbox: "bhe",
    subject: "BHE speaking / event",
  },
  {
    value: "partnerships",
    label: "Donation, sponsorship, or partnership",
    inbox: "partnerships",
    subject: "Mission 139 partnership / donation",
  },
  {
    value: "other",
    label: "Something else",
    inbox: "bhe",
    subject: "General inquiry",
  },
] as const satisfies readonly {
  value: string
  label: string
  inbox: InquiryInbox
  subject: string
}[]

export type InquiryValue = (typeof INQUIRY_OPTIONS)[number]["value"]

export const ROLE_OPTIONS = [
  "Parent or caregiver",
  "Educator",
  "School or district leader",
  "Event organizer",
  "Donor or partner",
  "Other",
] as const

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within the next month",
  "This school year",
  "Just exploring for now",
] as const

export function inquiryByValue(value: string) {
  return INQUIRY_OPTIONS.find((option) => option.value === value)
}

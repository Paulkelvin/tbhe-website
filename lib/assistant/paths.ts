// Client-safe assistant identity and pathway copy.

export const ASSISTANT_NAME = "H.U.M.A.N."
export const ASSISTANT_EXPANSION =
  "Helping You Understand, Move Forward, Advocate & Navigate"

export const GREETING = `Welcome! I'm H.U.M.A.N., your guide for The Beautifully Human Educator and Mission 139. Tell me a little about yourself, and I'll help you find the right next step.`

export const PATHWAYS = [
  {
    id: "parent",
    label: "I'm a parent",
    detail: "Advocacy & IEPs",
    prompt: "I'm a parent or caregiver looking for support for my child.",
    icon: "HandHeart",
  },
  {
    id: "educator",
    label: "I'm an educator",
    detail: "Coaching & PD",
    prompt: "I'm an educator interested in coaching or professional learning.",
    icon: "Student",
  },
  {
    id: "leader",
    label: "I'm a school leader",
    detail: "Consulting",
    prompt:
      "I'm a school leader looking for consulting or school improvement support.",
    icon: "Buildings",
  },
  {
    id: "organizer",
    label: "I'm an event organizer",
    detail: "Speaking",
    prompt:
      "I'm planning an event and want to learn about speaking or workshops.",
    icon: "Microphone",
  },
  {
    id: "donor",
    label: "I want to give",
    detail: "Mission 139",
    prompt: "I'd like to learn about donating or partnering with Mission 139.",
    icon: "Heart",
  },
  {
    id: "exploring",
    label: "I'm exploring",
    detail: "Learn more",
    prompt:
      "I'm just learning about The Beautifully Human Educator and Mission 139.",
    icon: "Compass",
  },
] as const

export type Pathway = (typeof PATHWAYS)[number]

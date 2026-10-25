// Client-safe assistant identity and starter prompts.

export const ASSISTANT_NAME = "H.U.M.A.N."
export const ASSISTANT_EXPANSION =
  "Helping You Understand, Move Forward, Advocate & Navigate"

export const GREETING = `Hi! I'm H.U.M.A.N., your guide for The Beautifully Human Educator and Mission 139. What can I help you with today?`

export const SUGGESTIONS = [
  {
    label: "My child needs support",
    prompt: "I'm a parent looking for support for my child.",
  },
  {
    label: "Coaching for my school",
    prompt:
      "I'm looking for coaching or professional development for my school.",
  },
  {
    label: "Speaking or an event",
    prompt: "I'd like to ask about speaking or workshops for an event.",
  },
] as const

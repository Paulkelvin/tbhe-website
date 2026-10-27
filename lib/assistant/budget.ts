import { getAdminClient, hasAdminToken } from "@/sanity/adminClient"

// A hard ceiling on AI messages, kept in Sanity so it survives server restarts and applies across all visitors.
// Per-visitor rate limits live in memory and reset; this is what actually caps the OpenAI bill.
const DAILY_LIMIT = Number(process.env.ASSISTANT_DAILY_LIMIT) || 120
const MONTHLY_LIMIT = Number(process.env.ASSISTANT_MONTHLY_LIMIT) || 1200

export const LIMIT_MESSAGE =
  "H.U.M.A.N. has reached its message limit for now. Please email us or use the Contact page, and a person will follow up."

/** Highest count seen per document (a transaction can echo a document more than once). Null if the counters are missing. */
export function withinLimits(docs: { _id: string; count?: number }[], dayId: string, monthId: string) {
  const counts = new Map<string, number>()
  for (const doc of docs) {
    if (doc?._id) counts.set(doc._id, Math.max(counts.get(doc._id) ?? 0, doc.count ?? 0))
  }
  if (!counts.has(dayId) || !counts.has(monthId)) return null
  return counts.get(dayId)! <= DAILY_LIMIT && counts.get(monthId)! <= MONTHLY_LIMIT
}

/** Counts one AI message and returns false once today's or this month's limit is used up. */
export async function reserveAssistantMessage(): Promise<boolean> {
  if (!hasAdminToken()) return true

  const now = new Date()
  const day = now.toISOString().slice(0, 10)
  const month = day.slice(0, 7)
  const dayId = `assistant-usage-${day}`
  const monthId = `assistant-usage-${month}`

  try {
    const results = await getAdminClient()
      .transaction()
      .createIfNotExists({ _id: dayId, _type: "assistantUsage", period: day, count: 0 })
      .createIfNotExists({ _id: monthId, _type: "assistantUsage", period: month, count: 0 })
      .patch(dayId, (p) => p.inc({ count: 1 }))
      .patch(monthId, (p) => p.inc({ count: 1 }))
      .commit({ returnDocuments: true })

    const allowed = withinLimits(results as unknown as { _id: string; count?: number }[], dayId, monthId)
    if (allowed === null) console.warn("[assistant] usage counter returned an unexpected response; chat stays open.")
    return allowed ?? true
  } catch (error) {
    // If the counter itself is unreachable, keep chatting: the per-visitor limit still applies.
    console.error("[assistant] usage counter failed:", error)
    return true
  }
}

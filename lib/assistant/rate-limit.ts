// Simple per-instance rate limiting for the assistant. Separate buckets from
// the public forms: a conversation is many requests, so chat gets a higher
// ceiling than a single form submission.

const buckets = new Map<string, number[]>()

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

export function isRateLimited(
  request: Request,
  {
    namespace,
    max,
    windowMs,
  }: { namespace: string; max: number; windowMs: number }
) {
  const key = `${namespace}:${clientIp(request)}`
  const now = Date.now()
  const hits = (buckets.get(key) ?? []).filter((time) => now - time < windowMs)
  hits.push(now)
  buckets.set(key, hits)
  if (buckets.size > 5000) buckets.clear()
  return hits.length > max
}

export const CHAT_LIMIT = {
  namespace: "assistant-chat",
  max: 30,
  windowMs: 10 * 60 * 1000,
}
export const LEAD_LIMIT = {
  namespace: "assistant-lead",
  max: 5,
  windowMs: 10 * 60 * 1000,
}
export const MAX_MESSAGE_LENGTH = 1500
export const MAX_HISTORY = 12

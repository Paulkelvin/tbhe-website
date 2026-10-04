// Spam protection that needs no third-party keys: a hidden honeypot field, basic validation and a per-visitor rate limit.

export const HONEYPOT_FIELD = "website"

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
// Per server instance, so it slows bursts from one visitor rather than being an exact global limit.
const recent = new Map<string, number[]>()

export function isRateLimited(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  hits.push(now)
  recent.set(ip, hits)
  if (recent.size > 5000) recent.clear()
  return hits.length > MAX_PER_WINDOW
}

export function isHoneypotFilled(body: Record<string, unknown>) {
  return typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD].trim().length > 0
}

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

/** Trims every string field and cuts it to a sane length so nobody can send megabytes through a form. */
export function cleanFields(body: Record<string, unknown>, maxLengths: Record<string, number>) {
  const out: Record<string, string> = {}
  for (const [key, max] of Object.entries(maxLengths)) {
    const value = body[key]
    out[key] = typeof value === "string" ? value.trim().slice(0, max) : ""
  }
  return out
}

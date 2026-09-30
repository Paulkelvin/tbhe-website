// Web Crypto (not node:crypto) so this works unmodified in both the Edge
// middleware and Node server actions.

export const ADMIN_COOKIE_NAME = "tbhe_admin_session"
export const ADMIN_SESSION_SECONDS = 12 * 60 * 60

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function sign(value: string): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set")
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))
  return toHex(signature)
}

// The expiry is inside the signed value, so a copied or old cookie stops working after 12 hours even if the browser keeps it.
export async function createSessionCookieValue(): Promise<string> {
  const value = `admin:${Date.now() + ADMIN_SESSION_SECONDS * 1000}`
  return `${value}.${await sign(value)}`
}

export async function isValidSession(cookieValue: string | undefined | null): Promise<boolean> {
  if (!cookieValue) return false
  const [value, signature] = cookieValue.split(".")
  const expiresAt = Number(value?.split(":")[1])
  if (!value?.startsWith("admin:") || !signature || !(expiresAt > Date.now())) return false
  try {
    return (await sign(value)) === signature
  } catch {
    return false
  }
}

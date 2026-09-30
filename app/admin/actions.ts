"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { getAdminClient } from "@/sanity/adminClient"
import { ADMIN_COOKIE_NAME, ADMIN_SESSION_SECONDS, createSessionCookieValue, isValidSession } from "@/lib/admin/auth"
import { syncSquarePayments } from "@/lib/payments"

export async function login(formData: FormData) {
  const password = formData.get("password")
  const from = formData.get("from")
  const target = typeof from === "string" && from.startsWith("/admin") ? from : "/admin"

  if (typeof password !== "string" || password.length === 0 || password !== process.env.ADMIN_PASSWORD) {
    redirect(`/admin/login?error=1&from=${encodeURIComponent(target)}`)
  }

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, await createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_SECONDS,
  })
  redirect(target)
}

// Server actions are plain POST endpoints, so each write re-checks the session instead of trusting the page-level redirect.
async function requireAdmin() {
  const cookieStore = await cookies()
  if (!(await isValidSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value))) {
    throw new Error("Not signed in.")
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
  redirect("/admin/login")
}

// Documents here are written directly as published (no drafts subsystem) —
// simplest model for a single-editor admin tool with no review workflow.
export async function adminSaveDocument(input: {
  type: string
  id?: string
  data: Record<string, unknown>
}): Promise<{ id: string }> {
  await requireAdmin()
  const client = getAdminClient()
  const result = input.id
    ? await client.createOrReplace({ _id: input.id, _type: input.type, ...input.data })
    : await client.create({ _type: input.type, ...input.data })
  revalidatePath("/", "layout")
  return { id: result._id }
}

export async function adminDeleteDocument(id: string): Promise<void> {
  await requireAdmin()
  const client = getAdminClient()
  await client.delete(id)
  revalidatePath("/", "layout")
}

export async function adminUploadImage(
  formData: FormData
): Promise<{ assetId: string; url: string }> {
  await requireAdmin()
  const file = formData.get("file")
  if (!(file instanceof File)) {
    throw new Error("No file provided")
  }
  const client = getAdminClient()
  const buffer = Buffer.from(await file.arrayBuffer())
  const asset = await client.assets.upload("image", buffer, {
    filename: file.name,
    contentType: file.type || undefined,
  })
  return { assetId: asset._id, url: asset.url }
}

export async function adminSyncPayments(): Promise<{ ok: true; count: number } | { ok: false; error: string }> {
  await requireAdmin()
  try {
    const count = await syncSquarePayments()
    revalidatePath("/admin/payments")
    return { ok: true, count }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Sync failed." }
  }
}

import { createClient } from "@sanity/client"

import { SANITY_DATASET, SANITY_PROJECT_ID } from "@/sanity/client"

// Server-only, write-capable client for the custom /admin dashboard.
// Never import this from a Client Component — the token would leak into
// the browser bundle.
export function hasAdminToken(): boolean {
  return Boolean(process.env.SANITY_API_WRITE_TOKEN)
}

export function getAdminClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) {
    throw new Error("SANITY_API_WRITE_TOKEN is not set")
  }
  return createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: "2025-01-01",
    token,
    useCdn: false,
    perspective: "raw",
  })
}

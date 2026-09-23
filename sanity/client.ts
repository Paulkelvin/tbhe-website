import { createClient } from "@sanity/client"

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "dwmxjj0q"
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: true,
  perspective: "published",
})

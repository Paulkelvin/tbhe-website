import type { Metadata } from "next"

import { SITE } from "@/lib/content"

// Shared helper so every page's Open Graph/Twitter preview actually
// matches its own title and description, instead of silently inheriting
// the site-wide defaults from the root layout.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const fullTitle = `${title} | ${SITE.shortName}`

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      title: fullTitle,
      description,
    },
  }
}

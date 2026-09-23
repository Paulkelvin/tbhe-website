import type { Metadata } from "next"

import { SITE, SITE_URL } from "@/lib/content"

// Shared helper so every page's Open Graph/Twitter preview actually
// matches its own title and description, instead of silently inheriting
// the site-wide defaults from the root layout.
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string
  description: string
  path: string
  // A page-specific social-preview image. Falls back to the site-wide
  // default (the founder photo used on the homepage) so no page ships
  // with a blank link preview, even ones with no photo of their own
  // (About, Contact, legal pages).
  image?: string
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
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  }
}

export const DEFAULT_OG_IMAGE = "/images/founder-hero.png"

// A BreadcrumbList JSON-LD object for a page nested under one parent
// section (e.g. an ecosystem arm's sub-page). Pass the result to
// JSON.stringify() inside a <script type="application/ld+json">.
export function breadcrumbSchema(
  trail: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  }
}

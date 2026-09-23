import { sanityClient } from "@/sanity/client"
import {
  FEATURED_RESOURCE as FALLBACK_FEATURED_RESOURCE,
  RESOURCE_CATEGORIES as FALLBACK_RESOURCE_CATEGORIES,
  RESOURCES as FALLBACK_RESOURCES,
  BUSINESS_CONTACT as FALLBACK_BUSINESS_CONTACT,
  SOCIAL_LINKS as FALLBACK_SOCIAL_LINKS,
  type Resource,
} from "@/lib/content"

// Sanity is the source of truth for this content, but a fetch failure
// (network blip, CORS misconfig, project outage) should never take the
// site down — every helper here falls back to the last-known static
// copy in lib/content.ts instead of throwing.

export type SanityResource = Resource & { featured?: boolean; ctaLabel?: string }

export async function getResources(): Promise<SanityResource[]> {
  try {
    const resources = await sanityClient.fetch<SanityResource[]>(
      `*[_type == "resource"]{ kind, category, title, description, file, featured, ctaLabel }`
    )
    if (resources?.length) return resources
  } catch {
    // fall through to static fallback
  }
  return [
    { ...FALLBACK_FEATURED_RESOURCE, featured: true },
    ...FALLBACK_RESOURCES.filter((r) => r.title !== FALLBACK_FEATURED_RESOURCE.title),
  ]
}

export function getResourceCategories(): readonly string[] {
  return FALLBACK_RESOURCE_CATEGORIES
}

export type SiteSettings = {
  siteName: string
  shortName: string
  tagline: string
  description: string
  email: string
  phone: string
  addressLine1: string
  addressCity: string
  addressState: string
  addressZip: string
  founderName: string
  socialLinks: { platform: string; url: string }[]
  calendlyBookingLink: string
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await sanityClient.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0]{ siteName, shortName, tagline, description, email, phone, addressLine1, addressCity, addressState, addressZip, founderName, socialLinks, calendlyBookingLink }`
    )
    if (settings) return settings
  } catch {
    // fall through to static fallback
  }
  return {
    siteName: "The Beautifully Human Educator",
    shortName: "TBHE",
    tagline: "Be a Better Teacher.",
    description: "",
    email: FALLBACK_BUSINESS_CONTACT.email,
    phone: FALLBACK_BUSINESS_CONTACT.phone,
    addressLine1: FALLBACK_BUSINESS_CONTACT.address,
    addressCity: "Bowie",
    addressState: "MD",
    addressZip: "20720",
    founderName: "Cyrkle B. Brent, M.Ed.",
    socialLinks: [
      { platform: "instagram", url: FALLBACK_SOCIAL_LINKS.instagram },
      { platform: "linkedin", url: FALLBACK_SOCIAL_LINKS.linkedin },
    ],
    calendlyBookingLink: "https://calendly.com/cbrent-stmartinsonline/new-meeting",
  }
}

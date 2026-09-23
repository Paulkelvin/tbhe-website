import { sanityClient } from "@/sanity/client"
import {
  FEATURED_RESOURCE as FALLBACK_FEATURED_RESOURCE,
  RESOURCE_CATEGORIES as FALLBACK_RESOURCE_CATEGORIES,
  RESOURCES as FALLBACK_RESOURCES,
  BUSINESS_CONTACT as FALLBACK_BUSINESS_CONTACT,
  SOCIAL_LINKS as FALLBACK_SOCIAL_LINKS,
  ARMS as FALLBACK_ARMS,
  NAV_LINKS as FALLBACK_NAV_LINKS,
  FOOTER_COLUMNS as FALLBACK_FOOTER_COLUMNS,
  COACHING_TEAM as FALLBACK_COACHING_TEAM,
  BOOKABLE_SERVICES as FALLBACK_BOOKABLE_SERVICES,
  SCHOOL_PARTNERS as FALLBACK_SCHOOL_PARTNERS,
  SCHOOLS_SERVED as FALLBACK_SCHOOLS_SERVED,
  IMPACT_STATS as FALLBACK_IMPACT_STATS,
  SITE,
  EVENTS as FALLBACK_EVENTS,
  CALENDLY_BOOKING_LINK as FALLBACK_CALENDLY_BOOKING_LINK,
  type Resource,
  type Arm,
  type ArmSlug,
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
  taglineSub: string
  description: string
  email: string
  phone: string
  addressLine1: string
  addressCity: string
  addressState: string
  addressZip: string
  founderName: string
  founderCredential: string
  founderTitle: string
  founderSecondaryTitle: string
  schoolsServed: string[]
  socialLinks: { platform: string; url: string }[]
  calendlyBookingLink: string
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await sanityClient.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0]{ siteName, shortName, tagline, taglineSub, description, email, phone, addressLine1, addressCity, addressState, addressZip, founderName, founderCredential, founderTitle, founderSecondaryTitle, schoolsServed, socialLinks, calendlyBookingLink }`
    )
    if (settings) return settings
  } catch {
    // fall through to static fallback
  }
  return {
    siteName: "The Beautifully Human Educator",
    shortName: "TBHE",
    tagline: "Be a Better Teacher.",
    taglineSub: "Transforming the landscape for underserved, under-resourced learners.",
    description: "",
    email: FALLBACK_BUSINESS_CONTACT.email,
    phone: FALLBACK_BUSINESS_CONTACT.phone,
    addressLine1: FALLBACK_BUSINESS_CONTACT.address,
    addressCity: "Bowie",
    addressState: "MD",
    addressZip: "20720",
    founderName: SITE.founderName,
    founderCredential: SITE.founderCredential,
    founderTitle: SITE.founderTitle,
    founderSecondaryTitle: SITE.founderSecondaryTitle,
    schoolsServed: [...FALLBACK_SCHOOLS_SERVED],
    socialLinks: [
      { platform: "instagram", url: FALLBACK_SOCIAL_LINKS.instagram },
      { platform: "linkedin", url: FALLBACK_SOCIAL_LINKS.linkedin },
    ],
    calendlyBookingLink: FALLBACK_CALENDLY_BOOKING_LINK,
  }
}

// The Arm["color"] design token differs from the slug-shaped colorKey
// stored in Sanity ("mission-139" -> "mission" for styling purposes).
function colorForSlug(slug: string): Arm["color"] {
  return slug === "mission-139" ? "mission" : (slug as Arm["color"])
}

export async function getArms(): Promise<Arm[]> {
  try {
    const arms = await sanityClient.fetch<
      {
        name: string
        slug: string
        kicker: string
        summary: string
        audience: string
        offerings: string[]
        cta: string
        features: Arm["features"]
      }[]
    >(
      `*[_type == "arm"] | order(order asc){ name, "slug": slug.current, "kicker": tagline, "summary": description, audience, offerings, cta, features }`
    )
    if (arms?.length) {
      return arms.map((arm) => ({
        ...arm,
        slug: arm.slug as ArmSlug,
        color: colorForSlug(arm.slug),
      }))
    }
  } catch {
    // fall through to static fallback
  }
  return [...FALLBACK_ARMS]
}

export async function getNavLinks(): Promise<{ label: string; href: string }[]> {
  try {
    const links = await sanityClient.fetch<{ label: string; href: string }[]>(
      `*[_type == "navLink"] | order(order asc){ label, href }`
    )
    if (links?.length) return links
  } catch {
    // fall through to static fallback
  }
  return [...FALLBACK_NAV_LINKS]
}

export type FooterColumn = { heading: string; links: { label: string; href: string }[] }

export async function getFooterColumns(): Promise<FooterColumn[]> {
  try {
    const columns = await sanityClient.fetch<FooterColumn[]>(
      `*[_type == "footerColumn"] | order(order asc){ heading, links }`
    )
    if (columns?.length) return columns
  } catch {
    // fall through to static fallback
  }
  return FALLBACK_FOOTER_COLUMNS.map((col) => ({
    heading: col.title,
    links: col.links.map(([label, href]) => ({ label, href })),
  }))
}

export type TeamMember = {
  name: string
  role: string
  photoUrl?: string | null
  photoAlt?: string | null
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const members = await sanityClient.fetch<TeamMember[]>(
      `*[_type == "teamMember"] | order(order asc){ name, role, "photoUrl": photo.asset->url, "photoAlt": photo.alt }`
    )
    if (members?.length) return members
  } catch {
    // fall through to static fallback
  }
  return FALLBACK_COACHING_TEAM.map((m) => ({ name: m.name, role: m.role, photoUrl: m.photo }))
}

export type BookableService = {
  title: string
  category: "educator" | "school"
  description: string
  duration?: string
  bookingUrl: string
  image?: string
  imageAlt?: string
  imagePosition?: string
}

export async function getBookableServices(): Promise<BookableService[]> {
  try {
    const services = await sanityClient.fetch<BookableService[]>(
      `*[_type == "bookableService"] | order(order asc){ title, category, description, duration, bookingUrl, "image": image.asset->url, "imageAlt": image.alt, imagePosition }`
    )
    if (services?.length) return services
  } catch {
    // fall through to static fallback
  }
  return FALLBACK_BOOKABLE_SERVICES.map((s) => ({
    title: s.title,
    category: s.category,
    description: s.tagline,
    duration: s.duration,
    bookingUrl: s.calLink,
    image: s.image,
    imageAlt: s.imageAlt,
    imagePosition: s.imagePosition,
  }))
}

export type SchoolPartner = {
  name: string
  logo?: string
  logoAlt?: string
  logoWidth?: number
  logoHeight?: number
}

export async function getSchoolPartners(): Promise<SchoolPartner[]> {
  try {
    const schools = await sanityClient.fetch<SchoolPartner[]>(
      `*[_type == "schoolPartner"] | order(order asc){ name, "logo": logo.asset->url, "logoAlt": logo.alt, "logoWidth": logo.asset->metadata.dimensions.width, "logoHeight": logo.asset->metadata.dimensions.height }`
    )
    if (schools?.length) return schools
  } catch {
    // fall through to static fallback
  }
  return FALLBACK_SCHOOL_PARTNERS.map((s) => ({
    name: s.name,
    logo: s.logo,
    logoWidth: s.width,
    logoHeight: s.height,
  }))
}

export async function getImpactStats(): Promise<{ value: string; label: string }[]> {
  try {
    const stats = await sanityClient.fetch<{ value: string; label: string }[]>(
      `*[_type == "impactStat"] | order(order asc){ value, label }`
    )
    if (stats?.length) return stats
  } catch {
    // fall through to static fallback
  }
  return [...FALLBACK_IMPACT_STATS]
}

export type SanityEvent = {
  title: string
  type?: string
  date?: string
  location?: string
  description: string
  registrationUrl?: string
}

export async function getEvents(): Promise<SanityEvent[]> {
  try {
    const events = await sanityClient.fetch<SanityEvent[]>(
      `*[_type == "event"] | order(date asc){ title, type, date, location, description, registrationUrl }`
    )
    if (events?.length) return events
  } catch {
    // fall through to static fallback
  }
  return FALLBACK_EVENTS.map((e) => ({ title: e.title, type: e.type, description: e.description }))
}

export type PortableTextBlock = {
  _type: "block"
  _key: string
  style: string
  listItem?: "bullet"
  level?: number
  markDefs: unknown[]
  children: { _type: "span"; _key: string; text: string; marks: string[] }[]
}

export type Post = {
  title: string
  slug: string
  excerpt?: string
  coverImage?: string
  coverImageAlt?: string
  author?: string
  authorPhoto?: string
  authorPhotoAlt?: string
  publishedAt?: string
  featured?: boolean
  body?: PortableTextBlock[]
}

const POST_PROJECTION = `{
  title,
  slug,
  excerpt,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  author,
  "authorPhoto": authorPhoto.asset->url,
  "authorPhotoAlt": authorPhoto.alt,
  publishedAt,
  featured,
  body
}`

// The blog is Sanity-only (no static fallback content) — an empty array
// here means "no posts yet," not a fetch failure, so pages should render
// their own empty state rather than showing fabricated placeholder posts.
export async function getPosts(): Promise<Post[]> {
  try {
    return (
      (await sanityClient.fetch<Post[]>(
        `*[_type == "post" && defined(slug)] | order(publishedAt desc) ${POST_PROJECTION}`
      )) ?? []
    )
  } catch {
    return []
  }
}

export async function getFeaturedPosts(limit = 2): Promise<Post[]> {
  try {
    return (
      (await sanityClient.fetch<Post[]>(
        `*[_type == "post" && featured == true && defined(slug)] | order(publishedAt desc) [0...${limit}] ${POST_PROJECTION}`
      )) ?? []
    )
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await sanityClient.fetch<Post | null>(
      `*[_type == "post" && slug == $slug][0] ${POST_PROJECTION}`,
      { slug }
    )
  } catch {
    return null
  }
}

import type { AdminField } from "@/lib/admin/field-types"
import { RESOURCE_CATEGORIES } from "@/lib/content"

export type AdminFieldGroup = { title: string; fieldNames: string[] }

export type AdminSection = {
  slug: string
  typeName: string
  title: string
  description: string
  singleton?: boolean
  fixedId?: string
  fields: AdminField[]
  // Optional: organizes a singleton's fields into labeled sections
  // instead of one flat grid. Collections don't need this — each
  // document is edited on its own page already.
  groups?: AdminFieldGroup[]
}

export const ADMIN_SECTIONS: AdminSection[] = [
  {
    slug: "settings",
    typeName: "siteSettings",
    title: "Site Settings",
    description: "Name, contact info, founder bio, and social links used across the whole site.",
    singleton: true,
    fixedId: "siteSettings",
    fields: [
      { type: "text", name: "siteName", label: "Site Name" },
      { type: "text", name: "shortName", label: "Short Name" },
      { type: "text", name: "tagline", label: "Tagline" },
      { type: "text", name: "taglineSub", label: "Tagline Subline" },
      { type: "textarea", name: "description", label: "Site Description" },
      { type: "text", name: "email", label: "Contact Email" },
      { type: "text", name: "phone", label: "Contact Phone" },
      { type: "text", name: "addressLine1", label: "Address Line 1" },
      { type: "text", name: "addressCity", label: "City" },
      { type: "text", name: "addressState", label: "State" },
      { type: "text", name: "addressZip", label: "ZIP" },
      { type: "text", name: "founderName", label: "Founder Name" },
      { type: "text", name: "founderCredential", label: "Founder Credential" },
      { type: "text", name: "founderTitle", label: "Founder Title" },
      { type: "text", name: "founderSecondaryTitle", label: "Founder Secondary Title" },
      { type: "stringList", name: "schoolsServed", label: "Schools Served (About page list)" },
      {
        type: "objectList",
        name: "socialLinks",
        label: "Social Links",
        itemFields: [
          { type: "text", name: "platform", label: "Platform (instagram / linkedin / mission139-instagram)" },
          { type: "text", name: "url", label: "URL" },
        ],
      },
      { type: "text", name: "calendlyBookingLink", label: "Calendly Booking Link" },
      { type: "text", name: "mission139InstagramUrl", label: "Mission 139 Instagram URL" },
    ],
    groups: [
      { title: "Basics", fieldNames: ["siteName", "shortName", "tagline", "taglineSub", "description"] },
      {
        title: "Founder",
        fieldNames: ["founderName", "founderCredential", "founderTitle", "founderSecondaryTitle"],
      },
      {
        title: "Contact & Address",
        fieldNames: ["email", "phone", "addressLine1", "addressCity", "addressState", "addressZip"],
      },
      { title: "About Page", fieldNames: ["schoolsServed"] },
      { title: "Links", fieldNames: ["socialLinks", "calendlyBookingLink", "mission139InstagramUrl"] },
    ],
  },
  {
    slug: "arms",
    typeName: "arm",
    title: "Ecosystem Arms",
    description: "Consulting, Mission 139, and Media & Publishing — copy shown on /ecosystem and each arm's own page.",
    fields: [
      { type: "text", name: "name", label: "Name", required: true },
      { type: "slug", name: "slug", label: "Slug" },
      { type: "text", name: "tagline", label: "Tagline / Kicker" },
      { type: "textarea", name: "description", label: "Summary" },
      { type: "text", name: "audience", label: "Audience" },
      { type: "stringList", name: "offerings", label: "Offerings" },
      { type: "text", name: "cta", label: "CTA Label" },
      {
        type: "objectList",
        name: "features",
        label: "Feature Modules",
        itemFields: [
          { type: "text", name: "icon", label: "Phosphor Icon Name" },
          { type: "text", name: "title", label: "Title" },
          { type: "textarea", name: "description", label: "Description" },
        ],
      },
      { type: "select", name: "colorKey", label: "Color Key", options: ["consulting", "mission-139", "media"] },
      { type: "number", name: "order", label: "Display Order" },
    ],
  },
  {
    slug: "services",
    typeName: "bookableService",
    title: "Bookable Services",
    description: "The four cards on the Consulting page's booking section.",
    fields: [
      { type: "text", name: "title", label: "Title", required: true },
      { type: "select", name: "category", label: "Category", options: ["educator", "school"] },
      { type: "textarea", name: "description", label: "Tagline" },
      { type: "text", name: "duration", label: "Duration" },
      { type: "text", name: "bookingUrl", label: "Booking URL (Calendly)" },
      { type: "image", name: "image", label: "Photo" },
      { type: "text", name: "imagePosition", label: "Image CSS object-position (e.g. 50% 12%)" },
      { type: "number", name: "order", label: "Display Order" },
    ],
  },
  {
    slug: "team",
    typeName: "teamMember",
    title: "Team Members",
    description: "The coaching team grid on the About page.",
    fields: [
      { type: "text", name: "name", label: "Name", required: true },
      { type: "text", name: "role", label: "Role" },
      { type: "textarea", name: "bio", label: "Bio" },
      { type: "image", name: "photo", label: "Photo" },
      { type: "number", name: "order", label: "Display Order" },
    ],
  },
  {
    slug: "resources",
    typeName: "resource",
    title: "Resources",
    description: "The Resource Center library, including the featured white paper.",
    fields: [
      { type: "text", name: "title", label: "Title", required: true },
      { type: "select", name: "kind", label: "Kind", options: ["White Paper", "Article", "Webinar Recording"] },
      { type: "select", name: "category", label: "Category", options: [...RESOURCE_CATEGORIES] },
      { type: "textarea", name: "description", label: "Description" },
      { type: "text", name: "file", label: "File / External URL" },
      { type: "boolean", name: "featured", label: "Featured on Resource Center" },
      { type: "text", name: "ctaLabel", label: "CTA Label (featured only)" },
    ],
  },
  {
    slug: "events",
    typeName: "event",
    title: "Events",
    description: "Upcoming events shown on the Events page.",
    fields: [
      { type: "text", name: "title", label: "Title", required: true },
      { type: "text", name: "type", label: "Event Type" },
      { type: "datetime", name: "date", label: "Date" },
      { type: "text", name: "location", label: "Location" },
      { type: "textarea", name: "description", label: "Description" },
      { type: "text", name: "registrationUrl", label: "Registration URL" },
    ],
  },
  {
    slug: "schools",
    typeName: "schoolPartner",
    title: "School Partner Logos",
    description: "The logo bar on the homepage.",
    fields: [
      { type: "text", name: "name", label: "Name", required: true },
      { type: "image", name: "logo", label: "Logo" },
      { type: "number", name: "order", label: "Display Order" },
    ],
  },
  {
    slug: "posts",
    typeName: "post",
    title: "Blog Posts",
    description: "Articles shown on /blog and featured on the homepage.",
    fields: [
      { type: "text", name: "title", label: "Title", required: true },
      { type: "text", name: "slug", label: "Slug (URL: /blog/your-slug-here)", required: true },
      { type: "textarea", name: "excerpt", label: "Excerpt (short summary for cards)" },
      { type: "image", name: "coverImage", label: "Cover Image" },
      { type: "text", name: "author", label: "Author (a team member's name, or a custom byline)" },
      { type: "image", name: "authorPhoto", label: "Author Photo" },
      { type: "datetime", name: "publishedAt", label: "Published At" },
      { type: "boolean", name: "featured", label: "Featured on Homepage" },
      { type: "richText", name: "body", label: "Body" },
    ],
  },
  {
    slug: "stats",
    typeName: "impactStat",
    title: "Impact Stats",
    description: "The stat tiles on the homepage and About page.",
    fields: [
      { type: "text", name: "value", label: "Value", required: true },
      { type: "text", name: "label", label: "Label", required: true },
      { type: "number", name: "order", label: "Display Order" },
    ],
  },
  {
    slug: "nav",
    typeName: "navLink",
    title: "Navigation Links",
    description: "The main header navigation.",
    fields: [
      { type: "text", name: "label", label: "Label", required: true },
      { type: "text", name: "href", label: "Href" },
      { type: "number", name: "order", label: "Display Order" },
    ],
  },
  {
    slug: "footer",
    typeName: "footerColumn",
    title: "Footer Columns",
    description: "The link columns in the site footer.",
    fields: [
      { type: "text", name: "heading", label: "Heading", required: true },
      {
        type: "objectList",
        name: "links",
        label: "Links",
        itemFields: [
          { type: "text", name: "label", label: "Label" },
          { type: "text", name: "href", label: "Href" },
        ],
      },
      { type: "number", name: "order", label: "Display Order" },
    ],
  },
]

export function getAdminSection(slug: string): AdminSection | undefined {
  return ADMIN_SECTIONS.find((section) => section.slug === slug)
}

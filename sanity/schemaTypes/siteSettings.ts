import { defineField, defineType } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "shortName", title: "Short Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "taglineSub", title: "Tagline Subline", type: "string" }),
    defineField({ name: "description", title: "Site Description", type: "text" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Contact Phone", type: "string" }),
    defineField({ name: "addressLine1", title: "Address Line 1", type: "string" }),
    defineField({ name: "addressCity", title: "City", type: "string" }),
    defineField({ name: "addressState", title: "State", type: "string" }),
    defineField({ name: "addressZip", title: "ZIP", type: "string" }),
    defineField({ name: "founderName", title: "Founder Name", type: "string" }),
    defineField({ name: "founderCredential", title: "Founder Credential", type: "string" }),
    defineField({ name: "founderTitle", title: "Founder Title", type: "string" }),
    defineField({ name: "founderSecondaryTitle", title: "Founder Secondary Title", type: "string" }),
    defineField({
      name: "schoolsServed",
      title: "Schools Served",
      type: "array",
      of: [{ type: "string" }],
      description: "Plain-text list shown on the About page (distinct from the logo Partners list).",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
    defineField({ name: "calendlyBookingLink", title: "Calendly Booking Link", type: "url" }),
    defineField({ name: "mission139InstagramUrl", title: "Mission 139 Instagram URL", type: "url" }),
    defineField({
      name: "mission139Ein",
      title: "Mission 139 EIN",
      type: "string",
      description: "IRS tax ID, e.g. 12-3456789. Shown on the Donate page, footer and donation receipts once filled in.",
    }),
    defineField({
      name: "showEventsPage",
      title: "Show Events page",
      type: "boolean",
      description: "Off hides Events from the menu, footer and sitemap, and /events shows the not-found page.",
      initialValue: false,
    }),
  ],
})

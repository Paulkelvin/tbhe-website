import { defineField, defineType } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "shortName", title: "Short Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Site Description", type: "text" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Contact Phone", type: "string" }),
    defineField({ name: "addressLine1", title: "Address Line 1", type: "string" }),
    defineField({ name: "addressCity", title: "City", type: "string" }),
    defineField({ name: "addressState", title: "State", type: "string" }),
    defineField({ name: "addressZip", title: "ZIP", type: "string" }),
    defineField({ name: "founderName", title: "Founder Name", type: "string" }),
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
  ],
})

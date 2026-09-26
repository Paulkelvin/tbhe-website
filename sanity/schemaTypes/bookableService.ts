import { defineField, defineType } from "sanity"

export default defineType({
  name: "bookableService",
  title: "Bookable Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["educator", "school"] },
      description: "Educator services are directly bookable on a calendar; school services route to a quote request.",
    }),
    defineField({ name: "description", title: "Tagline", type: "text" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "bookingUrl", title: "Booking URL (Calendly)", type: "url" }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description:
        "Per-session price in whole dollars, e.g. 150 for $150. Leave empty for services with no online payment (free calls, or school/district engagements quoted individually) — setting this is what turns on the \"Pay & Reserve\" button for this service.",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const image = context.parent as { asset?: unknown } | undefined
              if (image?.asset && !alt) {
                return "Alt text is required when an image is set"
              }
              return true
            }),
        },
      ],
    }),
    defineField({
      name: "imagePosition",
      title: "Image CSS object-position",
      type: "string",
      description: 'e.g. "50% 12%" — controls the image crop focal point.',
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
})

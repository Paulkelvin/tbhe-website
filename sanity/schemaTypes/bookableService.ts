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
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
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

import { defineField, defineType } from "sanity"

export default defineType({
  name: "bookableService",
  title: "Bookable Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "bookingUrl", title: "Booking URL", type: "url" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
})

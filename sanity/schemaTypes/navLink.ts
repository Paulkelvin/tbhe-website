import { defineField, defineType } from "sanity"

export default defineType({
  name: "navLink",
  title: "Navigation Link",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", title: "Href", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label", subtitle: "href" } },
})

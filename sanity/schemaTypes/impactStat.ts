import { defineField, defineType } from "sanity"

export default defineType({
  name: "impactStat",
  title: "Impact Stat",
  type: "document",
  fields: [
    defineField({ name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "value", subtitle: "label" } },
})

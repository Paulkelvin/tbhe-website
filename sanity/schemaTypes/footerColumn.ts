import { defineField, defineType } from "sanity"

export default defineType({
  name: "footerColumn",
  title: "Footer Column",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerLink",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Href" },
          ],
        },
      ],
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "heading" } },
})

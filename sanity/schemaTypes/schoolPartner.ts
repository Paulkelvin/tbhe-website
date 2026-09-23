import { defineField, defineType } from "sanity"

export default defineType({
  name: "schoolPartner",
  title: "School Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    // Plain string, not a Sanity image asset: points at a static file
    // under /public/logos.
    defineField({ name: "logo", title: "Logo Path", type: "string" }),
    defineField({ name: "logoWidth", title: "Logo Width (px)", type: "number" }),
    defineField({ name: "logoHeight", title: "Logo Height (px)", type: "number" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
})

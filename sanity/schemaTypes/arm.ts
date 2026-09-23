import { defineField, defineType } from "sanity"

export default defineType({
  name: "arm",
  title: "Ecosystem Arm",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "tagline", title: "Tagline / Kicker", type: "string" }),
    defineField({ name: "description", title: "Summary", type: "text" }),
    defineField({ name: "audience", title: "Audience", type: "string" }),
    defineField({
      name: "offerings",
      title: "Offerings",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "cta", title: "CTA Label", type: "string" }),
    defineField({
      name: "features",
      title: "Feature Modules",
      description: "The icon-led feature list shown on this arm's own page (e.g. Consulting's PD modules).",
      type: "array",
      of: [
        {
          type: "object",
          name: "armFeature",
          fields: [
            { name: "icon", type: "string", title: "Phosphor Icon Name" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        },
      ],
    }),
    defineField({
      name: "colorKey",
      title: "Color Key",
      type: "string",
      options: { list: ["consulting", "mission-139", "media"] },
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "tagline" } },
})

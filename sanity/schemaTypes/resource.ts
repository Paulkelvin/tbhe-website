import { defineField, defineType } from "sanity"

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: { list: ["White Paper", "Article", "Webinar Recording"] },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Articles & Thought Leadership",
          "Downloadable Tools & Guides",
          "Webinar & Workshop Recordings",
          "For Families",
          "For Educators & Leaders",
          "Intellectual Property & Educator Protection",
        ],
      },
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    // Plain string, not `url` type: some resources link to a relative
    // path under /public/resources rather than an absolute URL.
    defineField({ name: "file", title: "File / External URL", type: "string" }),
    defineField({ name: "featured", title: "Featured on Resource Center", type: "boolean", initialValue: false }),
    defineField({ name: "ctaLabel", title: "CTA Label (featured only)", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
})

import { defineField, defineType } from "sanity"

export default defineType({
  name: "coachingPlan",
  title: "Executive Coaching Plan",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "validity", title: "Validity (e.g. Valid for one year)", type: "string" }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Whole dollars, e.g. 10000 for $10,000.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "setupFee",
      title: "Account Setup Fee (USD)",
      type: "number",
      description: "Whole dollars, added to the price at checkout.",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
})

import { defineField, defineType } from "sanity"

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "type", title: "Event Type", type: "string", description: "e.g. Webinar, Workshop, Community Meetup" }),
    defineField({ name: "date", title: "Date", type: "datetime" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "registrationUrl", title: "Registration URL", type: "url" }),
  ],
  orderings: [{ title: "Date", name: "dateAsc", by: [{ field: "date", direction: "asc" }] }],
})

// Shared between server pages (building GROQ projections, default values)
// and the client-side editor (rendering the right input for each field).
// Kept dependency-free so it can be imported from either side.

export type AdminField =
  | { type: "text"; name: string; label: string; required?: boolean }
  | { type: "textarea"; name: string; label: string }
  | { type: "number"; name: string; label: string }
  | { type: "boolean"; name: string; label: string }
  | { type: "select"; name: string; label: string; options: string[] }
  | { type: "datetime"; name: string; label: string }
  | { type: "image"; name: string; label: string }
  | { type: "slug"; name: string; label: string }
  | { type: "stringList"; name: string; label: string }
  | { type: "richText"; name: string; label: string }
  | { type: "objectList"; name: string; label: string; itemFields: AdminField[] }

export function buildProjection(fields: readonly AdminField[]): string {
  const parts = fields.map((field) => {
    if (field.type === "image") {
      return `${field.name}, "${field.name}Url": ${field.name}.asset->url`
    }
    return field.name
  })
  return parts.join(", ")
}

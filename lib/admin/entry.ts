import type { AdminField } from "@/lib/admin/field-types"
import { blocksToText, textToBlocks } from "@/lib/admin/richtext"

export type Values = Record<string, unknown>

export function isoToLocalInputValue(iso: unknown): string {
  if (typeof iso !== "string" || !iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function localInputValueToIso(local: string): string {
  if (!local) return ""
  const d = new Date(local)
  return Number.isNaN(d.getTime()) ? "" : d.toISOString()
}

export function emptyValue(field: AdminField): unknown {
  switch (field.type) {
    case "boolean":
      return false
    case "objectList":
      return []
    case "image":
    case "slug":
      return null
    default:
      return ""
  }
}

export function emptyItem(itemFields: AdminField[]): Values {
  const item: Values = { _key: crypto.randomUUID() }
  for (const f of itemFields) item[f.name] = emptyValue(f)
  return item
}

export function deserializeValues(
  fields: AdminField[],
  doc: Record<string, unknown>
): { values: Values; imagePreviews: Record<string, string | undefined> } {
  const values: Values = {}
  const imagePreviews: Record<string, string | undefined> = {}
  for (const field of fields) {
    const raw = doc[field.name]
    if (field.type === "stringList") {
      values[field.name] = Array.isArray(raw) ? raw.join("\n") : ""
    } else if (field.type === "richText") {
      values[field.name] = blocksToText(raw)
    } else if (field.type === "objectList") {
      values[field.name] = Array.isArray(raw)
        ? raw.map((item) => ({ _key: crypto.randomUUID(), ...(item as Values) }))
        : []
    } else if (field.type === "image") {
      values[field.name] = raw ?? null
      const url = doc[`${field.name}Url`]
      if (typeof url === "string") imagePreviews[field.name] = url
    } else {
      values[field.name] = raw ?? emptyValue(field)
    }
  }
  return { values, imagePreviews }
}

export function emptyValues(fields: AdminField[]): Values {
  const values: Values = {}
  for (const field of fields) values[field.name] = emptyValue(field)
  return values
}

export function buildSavePayload(fields: AdminField[], values: Values): Values {
  const out: Values = {}
  for (const field of fields) {
    const v = values[field.name]
    if (field.type === "stringList") {
      out[field.name] = typeof v === "string" ? v.split("\n").map((s) => s.trim()).filter(Boolean) : []
    } else if (field.type === "richText") {
      out[field.name] = typeof v === "string" ? textToBlocks(v) : []
    } else if (field.type === "number") {
      out[field.name] = v === "" || v == null ? null : Number(v)
    } else if (field.type === "objectList" && Array.isArray(v)) {
      out[field.name] = v.map((item) => ({ _type: (item as Values)._type ?? "objectListItem", ...(item as Values) }))
    } else {
      out[field.name] = v
    }
  }
  return out
}

// Best-effort display title for a document in a list — the first
// non-empty plain-text field, since every content type has one.
export function valuesLabel(values: Values): string {
  const first = Object.values(values).find((v) => typeof v === "string" && v.trim().length > 0)
  return (first as string) || "Untitled"
}

// Compact list-row summary: title (first text-ish field), a subtitle
// (the next one after it), and a thumbnail if the doc has an image field.
export function summarizeDoc(
  fields: AdminField[],
  doc: Record<string, unknown>
): { title: string; subtitle?: string; imageUrl?: string } {
  const textish = fields.filter((f) => f.type === "text" || f.type === "textarea")
  const strings = textish
    .map((f) => doc[f.name])
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
  const imageField = fields.find((f) => f.type === "image")
  const imageUrl = imageField ? (doc[`${imageField.name}Url`] as string | undefined) : undefined
  return { title: strings[0] || "Untitled", subtitle: strings[1], imageUrl }
}

"use client"

import { useState } from "react"

import { adminDeleteDocument, adminSaveDocument, adminUploadImage } from "@/app/admin/actions"
import type { AdminField } from "@/lib/admin/field-types"

type Values = Record<string, unknown>

type Entry = {
  key: string
  id: string | null
  values: Values
  imagePreviews: Record<string, string | undefined>
  saving: boolean
  deleting: boolean
  error: string | null
  saved: boolean
}

function isoToLocalInputValue(iso: unknown): string {
  if (typeof iso !== "string" || !iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function localInputValueToIso(local: string): string {
  if (!local) return ""
  const d = new Date(local)
  return Number.isNaN(d.getTime()) ? "" : d.toISOString()
}

function emptyValue(field: AdminField): unknown {
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

function emptyItem(itemFields: AdminField[]): Values {
  const item: Values = { _key: crypto.randomUUID() }
  for (const f of itemFields) item[f.name] = emptyValue(f)
  return item
}

function deserializeDoc(fields: AdminField[], doc: Record<string, unknown>): Entry {
  const values: Values = {}
  const imagePreviews: Record<string, string | undefined> = {}
  for (const field of fields) {
    const raw = doc[field.name]
    if (field.type === "stringList") {
      values[field.name] = Array.isArray(raw) ? raw.join("\n") : ""
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
  return {
    key: (doc._id as string) ?? crypto.randomUUID(),
    id: (doc._id as string) ?? null,
    values,
    imagePreviews,
    saving: false,
    deleting: false,
    error: null,
    saved: false,
  }
}

function newEntry(fields: AdminField[]): Entry {
  const values: Values = {}
  for (const field of fields) values[field.name] = emptyValue(field)
  return {
    key: crypto.randomUUID(),
    id: null,
    values,
    imagePreviews: {},
    saving: false,
    deleting: false,
    error: null,
    saved: false,
  }
}

function buildSavePayload(fields: AdminField[], values: Values): Values {
  const out: Values = {}
  for (const field of fields) {
    const v = values[field.name]
    if (field.type === "stringList") {
      out[field.name] = typeof v === "string" ? v.split("\n").map((s) => s.trim()).filter(Boolean) : []
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

function entryLabel(entry: Entry): string {
  const first = Object.values(entry.values).find((v) => typeof v === "string" && v.trim().length > 0)
  return (first as string) || "Untitled"
}

export function CollectionEditor({
  typeName,
  title,
  description,
  fields,
  initialDocs,
  singleton = false,
  fixedId,
}: {
  typeName: string
  title: string
  description?: string
  fields: AdminField[]
  initialDocs: Record<string, unknown>[]
  singleton?: boolean
  fixedId?: string
}) {
  const [entries, setEntries] = useState<Entry[]>(() =>
    initialDocs.length > 0
      ? initialDocs.map((d) => deserializeDoc(fields, d))
      : singleton
        ? [{ ...newEntry(fields), id: fixedId ?? null }]
        : []
  )

  function updateEntry(key: string, patch: Partial<Entry>) {
    setEntries((prev) => prev.map((e) => (e.key === key ? { ...e, ...patch } : e)))
  }

  function setFieldValue(key: string, name: string, value: unknown) {
    setEntries((prev) =>
      prev.map((e) => (e.key === key ? { ...e, values: { ...e.values, [name]: value }, saved: false } : e))
    )
  }

  async function handleSave(entry: Entry) {
    updateEntry(entry.key, { saving: true, error: null })
    try {
      const payload = buildSavePayload(fields, entry.values)
      const result = await adminSaveDocument({
        type: typeName,
        id: entry.id ?? (singleton ? fixedId : undefined),
        data: payload,
      })
      updateEntry(entry.key, { saving: false, id: result.id, saved: true })
    } catch (err) {
      updateEntry(entry.key, {
        saving: false,
        error: err instanceof Error ? err.message : "Failed to save.",
      })
    }
  }

  async function handleDelete(entry: Entry) {
    if (!entry.id) {
      setEntries((prev) => prev.filter((e) => e.key !== entry.key))
      return
    }
    if (!confirm("Delete this entry? This can't be undone.")) return
    updateEntry(entry.key, { deleting: true, error: null })
    try {
      await adminDeleteDocument(entry.id)
      setEntries((prev) => prev.filter((e) => e.key !== entry.key))
    } catch (err) {
      updateEntry(entry.key, {
        deleting: false,
        error: err instanceof Error ? err.message : "Failed to delete.",
      })
    }
  }

  function handleAdd() {
    setEntries((prev) => [...prev, newEntry(fields)])
  }

  return (
    <div>
      <p className="eyebrow text-primary">{title}</p>
      <h1 className="text-h2 mt-2 text-ink">{title}</h1>
      {description ? <p className="text-body-sm mt-2 max-w-xl text-body">{description}</p> : null}

      <div className="mt-8 flex flex-col gap-6">
        {entries.map((entry) => (
          <div key={entry.key} className="rounded-2xl border border-hairline bg-canvas p-5 sm:p-6">
            {!singleton ? (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-h3-alt text-ink">{entryLabel(entry)}</p>
                <button
                  type="button"
                  onClick={() => handleDelete(entry)}
                  disabled={entry.deleting}
                  className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
                >
                  {entry.deleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={
                    field.type === "textarea" || field.type === "stringList" || field.type === "objectList" || field.type === "image"
                      ? "sm:col-span-2"
                      : undefined
                  }
                >
                  <FieldInput
                    field={field}
                    value={entry.values[field.name]}
                    imagePreview={entry.imagePreviews[field.name]}
                    onChange={(v) => setFieldValue(entry.key, field.name, v)}
                    onImagePreview={(url) =>
                      updateEntry(entry.key, {
                        imagePreviews: { ...entry.imagePreviews, [field.name]: url },
                      })
                    }
                  />
                </div>
              ))}
            </div>

            {entry.error ? <p className="mt-3 text-sm font-medium text-red-600">{entry.error}</p> : null}

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSave(entry)}
                disabled={entry.saving}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {entry.saving ? "Saving…" : "Save"}
              </button>
              {entry.saved ? <span className="text-sm font-medium text-green-700">Saved</span> : null}
            </div>
          </div>
        ))}

        {!singleton ? (
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-2xl border border-dashed border-hairline-strong px-5 py-4 text-sm font-semibold text-body transition-colors hover:border-primary hover:text-primary"
          >
            + Add new
          </button>
        ) : null}
      </div>
    </div>
  )
}

function FieldInput({
  field,
  value,
  imagePreview,
  onChange,
  onImagePreview,
}: {
  field: AdminField
  value: unknown
  imagePreview: string | undefined
  onChange: (value: unknown) => void
  onImagePreview: (url: string | undefined) => void
}) {
  const inputClass =
    "w-full rounded-lg border border-hairline-strong bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"

  if (field.type === "slug") {
    const current = value && typeof value === "object" ? (value as { current?: string }).current : ""
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-body-strong">{field.label}</span>
        <input disabled value={current ?? ""} className={`${inputClass} opacity-60`} />
      </label>
    )
  }

  if (field.type === "text") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-body-strong">{field.label}</span>
        <input
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </label>
    )
  }

  if (field.type === "textarea" || field.type === "stringList") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-body-strong">
          {field.label}
          {field.type === "stringList" ? " (one per line)" : ""}
        </span>
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          rows={field.type === "stringList" ? 4 : 3}
          className={inputClass}
        />
      </label>
    )
  }

  if (field.type === "number") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-body-strong">{field.label}</span>
        <input
          type="number"
          value={typeof value === "number" || typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </label>
    )
  }

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2.5 pt-6">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="size-4 rounded border-hairline-strong"
        />
        <span className="text-sm font-semibold text-body-strong">{field.label}</span>
      </label>
    )
  }

  if (field.type === "select") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-body-strong">{field.label}</span>
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">—</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    )
  }

  if (field.type === "datetime") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-body-strong">{field.label}</span>
        <input
          type="datetime-local"
          value={isoToLocalInputValue(value)}
          onChange={(e) => onChange(localInputValueToIso(e.target.value))}
          className={inputClass}
        />
      </label>
    )
  }

  if (field.type === "image") {
    const image = value as { asset?: { _ref?: string }; alt?: string } | null
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-body-strong">{field.label}</span>
        {imagePreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagePreview} alt="" className="h-32 w-auto rounded-lg border border-hairline object-cover" />
        ) : (
          <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-dashed border-hairline-strong text-xs text-muted-ink">
            No image
          </div>
        )}
        <ImageUploadInput
          onUploaded={(assetId, url) => {
            onChange({ _type: "image", asset: { _type: "reference", _ref: assetId }, alt: image?.alt ?? "" })
            onImagePreview(url)
          }}
        />
        <input
          placeholder="Alt text"
          value={image?.alt ?? ""}
          onChange={(e) => onChange({ ...(image ?? {}), _type: "image", alt: e.target.value })}
          className={inputClass}
        />
        {image ? (
          <button
            type="button"
            onClick={() => {
              onChange(null)
              onImagePreview(undefined)
            }}
            className="w-fit text-xs font-semibold text-red-600 hover:underline"
          >
            Remove image
          </button>
        ) : null}
      </div>
    )
  }

  if (field.type === "objectList") {
    const items = Array.isArray(value) ? (value as Values[]) : []
    return (
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-body-strong">{field.label}</span>
        {items.map((item, index) => (
          <div key={(item._key as string) ?? index} className="rounded-lg border border-hairline p-3">
            <div className="grid gap-3">
              {field.itemFields.map((subField) => (
                <FieldInput
                  key={subField.name}
                  field={subField}
                  value={item[subField.name]}
                  imagePreview={undefined}
                  onChange={(v) => {
                    const next = items.map((it, i) => (i === index ? { ...it, [subField.name]: v } : it))
                    onChange(next)
                  }}
                  onImagePreview={() => {}}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="mt-2 text-xs font-semibold text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, emptyItem(field.itemFields)])}
          className="w-fit rounded-full border border-dashed border-hairline-strong px-3 py-1.5 text-xs font-semibold text-body hover:border-primary hover:text-primary"
        >
          + Add item
        </button>
      </div>
    )
  }

  return null
}

function ImageUploadInput({ onUploaded }: { onUploaded: (assetId: string, url: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (!file) return
          setUploading(true)
          setError(null)
          try {
            const formData = new FormData()
            formData.append("file", file)
            const result = await adminUploadImage(formData)
            onUploaded(result.assetId, result.url)
          } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed.")
          } finally {
            setUploading(false)
          }
        }}
        className="text-sm text-body"
      />
      {uploading ? <p className="mt-1 text-xs text-muted-ink">Uploading…</p> : null}
      {error ? <p className="mt-1 text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  )
}

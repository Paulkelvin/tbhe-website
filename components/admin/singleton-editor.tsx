"use client"

import { useState } from "react"

import { adminSaveDocument } from "@/app/admin/actions"
import { FieldGrid } from "@/components/admin/field-grid"
import type { AdminField } from "@/lib/admin/field-types"
import { buildSavePayload, deserializeValues, emptyValues, type Values } from "@/lib/admin/entry"
import type { AdminFieldGroup } from "@/lib/admin/registry"

export function SingletonEditor({
  typeName,
  fixedId,
  fields,
  groups,
  initialDoc,
}: {
  typeName: string
  fixedId: string
  fields: AdminField[]
  groups?: AdminFieldGroup[]
  initialDoc: Record<string, unknown> | null
}) {
  const initial = initialDoc ? deserializeValues(fields, initialDoc) : { values: emptyValues(fields), imagePreviews: {} }
  const [values, setValues] = useState<Values>(initial.values)
  const [imagePreviews, setImagePreviews] = useState(initial.imagePreviews)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function fieldsFor(names: string[]): AdminField[] {
    return names.map((name) => fields.find((f) => f.name === name)).filter((f): f is AdminField => Boolean(f))
  }

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      await adminSaveDocument({ type: typeName, id: fixedId, data: buildSavePayload(fields, values) })
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.")
    } finally {
      setSaving(false)
    }
  }

  const sections = groups ?? [{ title: "", fieldNames: fields.map((f) => f.name) }]

  return (
    <div className="flex flex-col gap-8">
      {sections.map((group) => (
        <div key={group.title || "_"} className="rounded-2xl border border-hairline bg-canvas p-5 sm:p-6">
          {group.title ? <h2 className="text-h3-alt mb-4 text-ink">{group.title}</h2> : null}
          <FieldGrid
            fields={fieldsFor(group.fieldNames)}
            values={values}
            imagePreviews={imagePreviews}
            onFieldChange={(name, v) => {
              setValues((prev) => ({ ...prev, [name]: v }))
              setSaved(false)
            }}
            onImagePreview={(name, url) => setImagePreviews((prev) => ({ ...prev, [name]: url }))}
          />
        </div>
      ))}

      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

      <div className="sticky bottom-4 flex items-center gap-3 rounded-full bg-canvas/95 p-1.5 shadow-[0_10px_30px_-10px_rgba(37,24,39,0.3)] backdrop-blur">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {saved ? <span className="text-sm font-medium text-green-700">Saved</span> : null}
      </div>
    </div>
  )
}

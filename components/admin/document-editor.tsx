"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { adminDeleteDocument, adminSaveDocument } from "@/app/admin/actions"
import { FieldGrid } from "@/components/admin/field-grid"
import type { AdminField } from "@/lib/admin/field-types"
import { buildSavePayload, deserializeValues, emptyValues, valuesLabel, type Values } from "@/lib/admin/entry"

export function DocumentEditor({
  sectionSlug,
  sectionTitle,
  typeName,
  fields,
  id,
  initialDoc,
}: {
  sectionSlug: string
  sectionTitle: string
  typeName: string
  fields: AdminField[]
  id: string | null
  initialDoc: Record<string, unknown> | null
}) {
  const router = useRouter()
  const initial = initialDoc ? deserializeValues(fields, initialDoc) : { values: emptyValues(fields), imagePreviews: {} }
  const [values, setValues] = useState<Values>(initial.values)
  const [imagePreviews, setImagePreviews] = useState(initial.imagePreviews)
  const [docId, setDocId] = useState(id)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const listHref = `/admin/content/${sectionSlug}`
  const isNew = docId === null

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      const result = await adminSaveDocument({
        type: typeName,
        id: docId ?? undefined,
        data: buildSavePayload(fields, values),
      })
      setDocId(result.id)
      setSaved(true)
      if (isNew) {
        router.replace(`/admin/content/${sectionSlug}/${result.id}`)
      } else {
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!docId) return
    if (!confirm("Delete this entry? This can't be undone.")) return
    setDeleting(true)
    setError(null)
    try {
      await adminDeleteDocument(docId)
      router.push(listHref)
    } catch (err) {
      setDeleting(false)
      setError(err instanceof Error ? err.message : "Failed to delete.")
    }
  }

  return (
    <div>
      <Link href={listHref} className="text-sm font-semibold text-primary hover:underline">
        ← Back to {sectionTitle}
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <h1 className="text-h2 text-ink">{isNew ? "New entry" : valuesLabel(values)}</h1>
        {!isNew ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        ) : null}
      </div>

      <div className="mt-6 rounded-2xl border border-hairline bg-canvas p-5 sm:p-6">
        <FieldGrid
          fields={fields}
          values={values}
          imagePreviews={imagePreviews}
          onFieldChange={(name, v) => {
            setValues((prev) => ({ ...prev, [name]: v }))
            setSaved(false)
          }}
          onImagePreview={(name, url) => setImagePreviews((prev) => ({ ...prev, [name]: url }))}
        />
      </div>

      {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

      <div className="mt-5 flex items-center gap-3">
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

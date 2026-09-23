"use client"

import { useState } from "react"

import { adminUploadImage } from "@/app/admin/actions"
import type { AdminField } from "@/lib/admin/field-types"
import {
  emptyItem,
  isoToLocalInputValue,
  localInputValueToIso,
  type Values,
} from "@/lib/admin/entry"

const inputClass =
  "w-full rounded-lg border border-hairline-strong bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"

export function FieldInput({
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

export function fieldSpansFullWidth(field: AdminField): boolean {
  return (
    field.type === "textarea" ||
    field.type === "stringList" ||
    field.type === "objectList" ||
    field.type === "image"
  )
}

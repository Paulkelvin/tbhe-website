"use client"

import { FieldInput, fieldSpansFullWidth } from "@/components/admin/field-input"
import type { AdminField } from "@/lib/admin/field-types"
import type { Values } from "@/lib/admin/entry"

export function FieldGrid({
  fields,
  values,
  imagePreviews,
  onFieldChange,
  onImagePreview,
}: {
  fields: AdminField[]
  values: Values
  imagePreviews: Record<string, string | undefined>
  onFieldChange: (name: string, value: unknown) => void
  onImagePreview: (name: string, url: string | undefined) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.name} className={fieldSpansFullWidth(field) ? "sm:col-span-2" : undefined}>
          <FieldInput
            field={field}
            value={values[field.name]}
            imagePreview={imagePreviews[field.name]}
            onChange={(v) => onFieldChange(field.name, v)}
            onImagePreview={(url) => onImagePreview(field.name, url)}
          />
        </div>
      ))}
    </div>
  )
}

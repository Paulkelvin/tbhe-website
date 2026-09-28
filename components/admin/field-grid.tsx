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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.name} className={fieldSpansFullWidth(field) ? "min-w-0 sm:col-span-2" : "min-w-0"}>
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

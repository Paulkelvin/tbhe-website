"use client"

import { useState } from "react"
import Link from "next/link"

import { adminDeleteDocument } from "@/app/admin/actions"
import type { AdminField } from "@/lib/admin/field-types"
import { summarizeDoc } from "@/lib/admin/entry"

export function CollectionList({
  sectionSlug,
  fields,
  initialDocs,
}: {
  sectionSlug: string
  fields: AdminField[]
  initialDocs: Record<string, unknown>[]
}) {
  const [docs, setDocs] = useState(initialDocs)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm("Delete this entry? This can't be undone.")) return
    setDeletingId(id)
    try {
      await adminDeleteDocument(id)
      setDocs((prev) => prev.filter((d) => d._id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {docs.map((doc) => {
        const id = doc._id as string
        const { title, subtitle, imageUrl } = summarizeDoc(fields, doc)
        return (
          <div
            key={id}
            className="flex items-center gap-4 rounded-xl border border-hairline bg-canvas px-4 py-3"
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className="size-11 shrink-0 rounded-lg object-cover" />
            ) : null}
            <Link href={`/admin/content/${sectionSlug}/${id}`} className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{title}</p>
              {subtitle ? <p className="truncate text-xs text-muted-ink">{subtitle}</p> : null}
            </Link>
            <Link
              href={`/admin/content/${sectionSlug}/${id}`}
              className="shrink-0 text-sm font-semibold text-primary hover:underline"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(id)}
              disabled={deletingId === id}
              className="shrink-0 text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
            >
              {deletingId === id ? "Deleting…" : "Delete"}
            </button>
          </div>
        )
      })}

      <Link
        href={`/admin/content/${sectionSlug}/new`}
        className="rounded-xl border border-dashed border-hairline-strong px-4 py-3 text-center text-sm font-semibold text-body transition-colors hover:border-primary hover:text-primary"
      >
        + Add new
      </Link>
    </div>
  )
}

import { notFound } from "next/navigation"

import { getAdminSection } from "@/lib/admin/registry"
import { buildProjection } from "@/lib/admin/field-types"
import { getAdminClient } from "@/sanity/adminClient"
import { DocumentEditor } from "@/components/admin/document-editor"

export const dynamic = "force-dynamic"

export default async function AdminDocumentPage({
  params,
}: {
  params: Promise<{ section: string; id: string }>
}) {
  const { section: slug, id } = await params
  const section = getAdminSection(slug)
  if (!section || section.singleton) notFound()

  const client = getAdminClient()
  const projection = buildProjection(section.fields)
  const doc = await client.fetch(`*[_id == $id][0]{ _id, ${projection} }`, { id })
  if (!doc) notFound()

  return (
    <DocumentEditor
      sectionSlug={section.slug}
      sectionTitle={section.title}
      typeName={section.typeName}
      fields={section.fields}
      id={id}
      initialDoc={doc}
    />
  )
}

import { notFound } from "next/navigation"

import { getAdminSection } from "@/lib/admin/registry"
import { buildProjection } from "@/lib/admin/field-types"
import { getAdminClient, hasAdminToken } from "@/sanity/adminClient"
import { CollectionEditor } from "@/components/admin/collection-editor"

export const dynamic = "force-dynamic"

export default async function AdminContentPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section: slug } = await params
  const section = getAdminSection(slug)
  if (!section) notFound()

  if (!hasAdminToken()) {
    return (
      <div>
        <p className="eyebrow text-primary">{section.title}</p>
        <h1 className="text-h2 mt-2 text-ink">{section.title}</h1>
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
          <p className="font-semibold">Setup needed</p>
          <p className="mt-1">
            Set the <code className="rounded bg-red-100 px-1">SANITY_API_WRITE_TOKEN</code>{" "}
            environment variable to edit content here.
          </p>
        </div>
      </div>
    )
  }

  const client = getAdminClient()
  const projection = buildProjection(section.fields)

  if (section.singleton) {
    const doc = await client.fetch(
      `*[_id == $id][0]{ _id, ${projection} }`,
      { id: section.fixedId }
    )
    return (
      <CollectionEditor
        typeName={section.typeName}
        title={section.title}
        description={section.description}
        fields={section.fields}
        initialDocs={doc ? [doc] : []}
        singleton
        fixedId={section.fixedId}
      />
    )
  }

  const docs = await client.fetch(
    `*[_type == $type] | order(coalesce(order, 0) asc){ _id, ${projection} }`,
    { type: section.typeName }
  )

  return (
    <CollectionEditor
      typeName={section.typeName}
      title={section.title}
      description={section.description}
      fields={section.fields}
      initialDocs={docs}
    />
  )
}

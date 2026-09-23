import { notFound } from "next/navigation"

import { getAdminSection } from "@/lib/admin/registry"
import { buildProjection } from "@/lib/admin/field-types"
import { getAdminClient, hasAdminToken } from "@/sanity/adminClient"
import { SingletonEditor } from "@/components/admin/singleton-editor"
import { CollectionList } from "@/components/admin/collection-list"

export const dynamic = "force-dynamic"

function SetupNotice({ title }: { title: string }) {
  return (
    <div>
      <p className="eyebrow text-primary">{title}</p>
      <h1 className="text-h2 mt-2 text-ink">{title}</h1>
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

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section: slug } = await params
  const section = getAdminSection(slug)
  if (!section) notFound()

  if (!hasAdminToken()) {
    return <SetupNotice title={section.title} />
  }

  const client = getAdminClient()
  const projection = buildProjection(section.fields)

  if (section.singleton) {
    const doc = await client.fetch(`*[_id == $id][0]{ _id, ${projection} }`, { id: section.fixedId })
    return (
      <div>
        <p className="eyebrow text-primary">{section.title}</p>
        <h1 className="text-h2 mt-2 text-ink">{section.title}</h1>
        {section.description ? (
          <p className="text-body-sm mt-2 max-w-xl text-body">{section.description}</p>
        ) : null}
        <div className="mt-8">
          <SingletonEditor
            typeName={section.typeName}
            fixedId={section.fixedId!}
            fields={section.fields}
            groups={section.groups}
            initialDoc={doc}
          />
        </div>
      </div>
    )
  }

  const docs = await client.fetch(
    `*[_type == $type] | order(coalesce(order, 0) asc){ _id, ${projection} }`,
    { type: section.typeName }
  )

  return (
    <div>
      <p className="eyebrow text-primary">{section.title}</p>
      <h1 className="text-h2 mt-2 text-ink">{section.title}</h1>
      {section.description ? (
        <p className="text-body-sm mt-2 max-w-xl text-body">{section.description}</p>
      ) : null}
      <div className="mt-8">
        <CollectionList sectionSlug={section.slug} fields={section.fields} initialDocs={docs} />
      </div>
    </div>
  )
}

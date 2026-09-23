import { notFound } from "next/navigation"

import { getAdminSection } from "@/lib/admin/registry"
import { DocumentEditor } from "@/components/admin/document-editor"

export const dynamic = "force-dynamic"

export default async function AdminNewDocumentPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section: slug } = await params
  const section = getAdminSection(slug)
  if (!section || section.singleton) notFound()

  return (
    <DocumentEditor
      sectionSlug={section.slug}
      sectionTitle={section.title}
      typeName={section.typeName}
      fields={section.fields}
      id={null}
      initialDoc={null}
    />
  )
}

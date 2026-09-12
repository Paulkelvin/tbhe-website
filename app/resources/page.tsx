import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { Badge } from "@/components/ui/badge"
import { RESOURCES } from "@/lib/content"

export const metadata: Metadata = {
  title: "Resource Center — The Beautifully Human Educator",
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resource Center"
        title="White papers, toolkits, and recordings"
        description="Research and resources from across the ecosystem — free to read, download, and share."
      />

      <section className="section">
        <div className="grid gap-6 sm:grid-cols-2">
          {RESOURCES.map((resource) => (
            <div
              key={resource.title}
              className="flex flex-col gap-3 rounded-2xl border border-hairline bg-surface-card p-6"
            >
              <Badge variant="secondary" className="w-fit">
                {resource.kind}
              </Badge>
              <h3 className="text-base font-semibold text-ink">
                {resource.title}
              </h3>
              <p className="text-sm text-body">{resource.description}</p>
              <span className="mt-1 text-sm font-medium text-primary">
                Download &rarr;
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

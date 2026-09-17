import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
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
        <div className="mx-auto max-w-3xl divide-y divide-hairline border-y border-hairline">
          {RESOURCES.map((resource, index) => (
            <Reveal key={resource.title} delay={index * 0.06}>
              <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
                  <Badge variant="secondary" className="w-fit shrink-0">
                    {resource.kind}
                  </Badge>
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      {resource.title}
                    </h3>
                    <p className="mt-1 max-w-xl text-sm text-body">
                      {resource.description}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-medium text-primary sm:pl-4">
                  Download &rarr;
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

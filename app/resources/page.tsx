import type { Metadata } from "next"

import { ResourceHero } from "@/components/resource-hero"
import { Reveal } from "@/components/reveal"
import { FEATURED_RESOURCE, RESOURCES } from "@/lib/content"

export const metadata: Metadata = {
  title: "Resource Center — The Beautifully Human Educator",
}

const secondaryResources = RESOURCES.filter(
  (r) => r.title !== FEATURED_RESOURCE.title
)
const kinds = Array.from(new Set(RESOURCES.map((r) => r.kind)))

function actionLabel(kind: string) {
  if (kind === "Webinar Recording") return "Watch"
  if (kind === "Article") return "Read"
  return "Download"
}

export default function ResourcesPage() {
  return (
    <>
      <ResourceHero />

      <section className="section">
        <div className="mx-auto max-w-4xl">
          {/* A quiet masthead strip naming what's in the archive — browsing
              cues, not a repeat of the list below. A tidy 2-column grid on
              mobile avoids an orphaned separator dot at the wrap point. */}
          <Reveal className="border-y border-hairline py-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-center sm:hidden">
              {kinds.map((kind) => (
                <span
                  key={kind}
                  className="eyebrow text-muted-ink"
                >
                  {kind}s
                </span>
              ))}
            </div>
            <div className="hidden items-center justify-center gap-5 sm:flex lg:justify-start">
              {kinds.map((kind, index) => (
                <span key={kind} className="flex items-center gap-5">
                  {index > 0 ? (
                    <span aria-hidden className="h-1 w-1 rounded-full bg-hairline-strong" />
                  ) : null}
                  <span className="eyebrow text-muted-ink">
                    {kind}s
                  </span>
                </span>
              ))}
            </div>
          </Reveal>

          {/* Featured — an open-spread treatment, not a card: a spine-like
              rule instead of a bounding box. */}
          <Reveal className="relative mt-14 border-l-2 border-primary/70 pl-6 sm:mt-16 sm:pl-10">
            <p className="eyebrow text-primary">
              Featured &middot; {FEATURED_RESOURCE.kind}
            </p>
            <h2 className="text-h2 mt-3 max-w-2xl text-ink">
              {FEATURED_RESOURCE.title}
            </h2>
            <p className="text-lead mt-4 max-w-xl text-body">
              {FEATURED_RESOURCE.description}
            </p>
            <span className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary">
              <span className="border-b border-primary/40 pb-0.5">
                {FEATURED_RESOURCE.cta}
              </span>
              <span aria-hidden>&rarr;</span>
            </span>
          </Reveal>

          {/* The rest of the archive — a contents-page rhythm: kind and
              title read as one line, excerpt beneath, thin rules between. */}
          <div className="mt-16 divide-y divide-hairline border-t border-hairline sm:mt-20">
            {secondaryResources.map((resource, index) => (
              <Reveal
                key={resource.title}
                delay={index * 0.06}
                className="flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div className="sm:max-w-xl">
                  <p className="eyebrow text-muted-ink">
                    {resource.kind}
                  </p>
                  <h3 className="text-h3 mt-1.5 text-ink">
                    {resource.title}
                  </h3>
                  <p className="text-body-sm mt-2 text-body">{resource.description}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-primary sm:pl-4">
                  {actionLabel(resource.kind)} &rarr;
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

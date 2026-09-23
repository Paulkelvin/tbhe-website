import { ResourceHero } from "@/components/resource-hero"
import { Reveal } from "@/components/reveal"
import { FEATURED_RESOURCE, RESOURCE_CATEGORIES, RESOURCES } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Resource Center",
  description:
    "Free white papers and research from The Beautifully Human Educator on special education policy, inclusive classrooms, and neurodivergent student support.",
  path: "/resources",
})

const secondaryResources = RESOURCES.filter(
  (r) => r.title !== FEATURED_RESOURCE.title
)

function actionLabel(kind: string, file: string) {
  if (kind === "Webinar Recording") return "Watch"
  if (kind === "Article") return "Read"
  // External links (no PDF hosted on our own site yet) get "View"
  // instead of "Download" so the label doesn't overpromise.
  if (file.startsWith("http")) return "View"
  return "Download"
}

export default function ResourcesPage() {
  return (
    <>
      <ResourceHero />

      <section className="section">
        <div className="mx-auto max-w-4xl">
          {/* Category masthead — every category the Resource Center is
              organized by, populated or not, so visitors can see what's
              coming as the library grows. */}
          <Reveal className="border-y border-hairline py-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-center sm:hidden">
              {RESOURCE_CATEGORIES.map((category) => (
                <span key={category} className="eyebrow text-muted-ink">
                  {category}
                </span>
              ))}
            </div>
            <div className="hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:flex lg:justify-start">
              {RESOURCE_CATEGORIES.map((category, index) => (
                <span key={category} className="flex items-center gap-5">
                  {index > 0 ? (
                    <span aria-hidden className="h-1 w-1 rounded-full bg-hairline-strong" />
                  ) : null}
                  <span className="eyebrow text-muted-ink">{category}</span>
                </span>
              ))}
            </div>
          </Reveal>

          {/* Featured — an open-spread treatment, not a card: a spine-like
              rule instead of a bounding box. Links straight to the PDF. */}
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
            <a
              href={FEATURED_RESOURCE.file}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
                {FEATURED_RESOURCE.cta}
              </span>
              <span className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </Reveal>

          {/* The rest of the archive, grouped by category. A category with
              nothing in it yet shows a quiet "Coming soon" line instead of
              disappearing, since the library is being built out over time. */}
          <div className="mt-16 sm:mt-20">
            {RESOURCE_CATEGORIES.map((category, categoryIndex) => {
              const items = secondaryResources.filter(
                (r) => r.category === category
              )
              return (
                <Reveal
                  key={category}
                  delay={categoryIndex * 0.04}
                  className="border-t border-hairline py-8 first:pt-0"
                >
                  <p className="eyebrow text-muted-ink">{category}</p>
                  {items.length > 0 ? (
                    <div className="mt-4 divide-y divide-hairline">
                      {items.map((resource) => (
                        <div
                          key={resource.title}
                          className="flex flex-col gap-3 py-5 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                        >
                          <div className="sm:max-w-xl">
                            <h3 className="text-h3 text-ink">
                              {resource.title}
                            </h3>
                            <p className="text-body-sm mt-2 text-body">
                              {resource.description}
                            </p>
                          </div>
                          <a
                            href={resource.file}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 text-sm font-semibold text-primary sm:pl-4"
                          >
                            {actionLabel(resource.kind, resource.file)} &rarr;
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-body-sm mt-3 text-muted-ink italic">
                      Coming soon.
                    </p>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

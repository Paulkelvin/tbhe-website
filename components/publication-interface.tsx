import { getResources } from "@/sanity/queries"

export async function PublicationInterface() {
  const resources = await getResources()
  const FEATURED_RESOURCE = resources.find((r) => r.featured) ?? resources[0]
  if (!FEATURED_RESOURCE) return null

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative rounded-lg border border-hairline bg-surface-card p-7 shadow-[0_35px_70px_-32px_rgba(37,24,39,0.45)] sm:p-10">
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <p className="eyebrow text-muted-ink">
            Resource Center
          </p>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-arm-media" />
        </div>

        <p className="eyebrow mt-6 text-arm-media-ink">
          {FEATURED_RESOURCE.kind}
        </p>
        <h3 className="text-h3 mt-3 text-ink">
          {FEATURED_RESOURCE.title}
        </h3>
        <p className="text-body-sm mt-4 text-body">{FEATURED_RESOURCE.description}</p>

        <a
          href={FEATURED_RESOURCE.file}
          target="_blank"
          rel="noreferrer noopener"
          className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary"
        >
          <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
            {FEATURED_RESOURCE.ctaLabel ?? "Download the White Paper"}
          </span>
          <span className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </a>
      </div>
    </div>
  )
}

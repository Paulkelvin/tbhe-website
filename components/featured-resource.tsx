import Link from "next/link"
import Image from "next/image"

import { Reveal } from "@/components/reveal"
import { getResources, type SanityResource } from "@/sanity/queries"

function Headline({
  resource,
  className,
}: {
  resource: SanityResource
  className?: string
}) {
  const [titleLead, ...titleRest] = resource.title.split(": ")
  const titleTail = titleRest.join(": ")
  if (!titleTail) {
    return (
      <h3 className={`text-h3 text-ink ${className ?? ""}`}>
        {titleLead}
      </h3>
    )
  }
  return (
    <h3 className={`text-h3 text-ink ${className ?? ""}`}>
      {titleLead}:
      <br />
      <span className="text-primary italic">{titleTail}</span>
    </h3>
  )
}

function ResourceMeta({ resource }: { resource: SanityResource }) {
  return (
    <p className="eyebrow text-arm-media-ink">
      Featured {resource.kind}
    </p>
  )
}

function ResourceCta({ resource }: { resource: SanityResource }) {
  return (
    <a
      href={resource.file}
      target="_blank"
      rel="noreferrer"
      className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary"
    >
      <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
        {resource.ctaLabel ?? "Download the White Paper"}
      </span>
      <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
    </a>
  )
}

export async function FeaturedResource() {
  const resources = await getResources()
  const FEATURED_RESOURCE = resources.find((r) => r.featured) ?? resources[0]
  if (!FEATURED_RESOURCE) return null

  return (
    <section className="section">
      <Reveal className="mx-auto mb-10 max-w-xl text-center md:mb-14">
        <p className="eyebrow text-primary">
          Insights &amp; Resources
        </p>
        <p className="text-lead mt-3 text-body">
          Research, frameworks, and field notes from across the ecosystem,
          starting with our latest white paper.
        </p>
      </Reveal>

      {/* Desktop: a large, right-weighted photograph with a narrower content
          panel floating over its upper-left edge — asymmetric and editorial
          rather than a centered, evenly-split card. */}
      <Reveal className="relative hidden md:block md:h-[440px]">
        <div className="absolute inset-y-0 right-0 w-[76%] overflow-hidden rounded-2xl">
          <Image
            src="/images/chess-knight.png"
            alt="A carved wooden chess knight in dramatic light, symbolizing strategic thinking"
            fill
            sizes="76vw"
            className="object-cover"
            style={{ objectPosition: "58% center" }}
          />
        </div>

        <div className="absolute top-10 left-0 w-[38%] rounded-2xl bg-surface-card p-8 shadow-[0_25px_60px_-32px_rgba(37,24,39,0.35)] lg:p-9">
          <ResourceMeta resource={FEATURED_RESOURCE} />
          <Headline resource={FEATURED_RESOURCE} className="mt-3" />
          <p className="text-body-sm mt-4 text-body">{FEATURED_RESOURCE.description}</p>
          <ResourceCta resource={FEATURED_RESOURCE} />
        </div>
      </Reveal>

      {/* Mobile: the photograph stays cinematic with more of it visible
          around the panel, which overlaps only its lower edge. */}
      <Reveal className="relative md:hidden">
        <div className="relative h-[420px] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/chess-knight.png"
            alt="A carved wooden chess knight in dramatic light, symbolizing strategic thinking"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "65% center" }}
          />
        </div>

        <div className="relative z-10 -mt-10 mx-4 rounded-2xl bg-surface-card p-6 shadow-[0_20px_45px_-28px_rgba(37,24,39,0.35)]">
          <ResourceMeta resource={FEATURED_RESOURCE} />
          <Headline resource={FEATURED_RESOURCE} className="mt-3" />
          <p className="text-body-sm mt-3 text-body">{FEATURED_RESOURCE.description}</p>
          <ResourceCta resource={FEATURED_RESOURCE} />
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mt-8 text-center md:mt-6 md:text-left">
        <Link
          href="/resources"
          className="text-body-sm font-medium text-muted-ink transition-colors hover:text-primary"
        >
          Explore all resources &rarr;
        </Link>
      </Reveal>
    </section>
  )
}

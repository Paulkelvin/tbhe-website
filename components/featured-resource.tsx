import Link from "next/link"
import Image from "next/image"

import { Reveal } from "@/components/reveal"
import { FEATURED_RESOURCE } from "@/lib/content"

const [titleLead, ...titleRest] = FEATURED_RESOURCE.title.split(": ")
const titleTail = titleRest.join(": ")

function Headline({ className }: { className?: string }) {
  return (
    <h3 className={`font-display font-semibold text-ink ${className ?? ""}`}>
      {titleLead}:
      <br />
      <span className="text-primary italic">{titleTail}</span>
    </h3>
  )
}

function ResourceMeta() {
  return (
    <p className="text-[11px] font-semibold tracking-[0.16em] text-arm-media-ink uppercase">
      Featured {FEATURED_RESOURCE.kind}
    </p>
  )
}

function ResourceCta() {
  return (
    <Link
      href="/resources"
      className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary"
    >
      <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
        {FEATURED_RESOURCE.cta}
      </span>
      <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
    </Link>
  )
}

export function FeaturedResource() {
  return (
    <section className="section">
      <Reveal className="mx-auto mb-10 max-w-xl text-center md:mb-14">
        <p className="font-display text-sm font-semibold tracking-[0.25em] text-primary uppercase">
          Insights &amp; Resources
        </p>
        <p className="mt-3 text-base text-body">
          Research, frameworks, and field notes from across the ecosystem —
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
          <ResourceMeta />
          <Headline className="mt-3 text-[1.65rem] leading-[1.15] lg:text-3xl" />
          <p className="mt-4 text-sm text-body">{FEATURED_RESOURCE.description}</p>
          <ResourceCta />
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
          <ResourceMeta />
          <Headline className="mt-3 text-2xl leading-[1.15]" />
          <p className="mt-3 text-sm text-body">{FEATURED_RESOURCE.description}</p>
          <ResourceCta />
        </div>
      </Reveal>

      <Reveal delay={0.05} className="mt-8 text-center md:mt-6 md:text-left">
        <Link
          href="/resources"
          className="text-sm font-medium text-muted-ink transition-colors hover:text-primary"
        >
          Explore all resources &rarr;
        </Link>
      </Reveal>
    </section>
  )
}

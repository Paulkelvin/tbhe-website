import Link from "next/link"
import Image from "next/image"

import { Reveal } from "@/components/reveal"
import { FEATURED_RESOURCE } from "@/lib/content"

function chessMotifStyle(corner: "bottom left" | "bottom right"): React.CSSProperties {
  return {
    backgroundImage: `
      linear-gradient(45deg, rgba(37,24,39,0.5) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(37,24,39,0.5) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(37,24,39,0.5) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(37,24,39,0.5) 75%)
    `,
    backgroundSize: "14px 14px",
    backgroundPosition: "0 0, 0 7px, 7px -7px, -7px 0px",
    opacity: 0.09,
    maskImage: `radial-gradient(circle at ${corner}, black, transparent 70%)`,
    WebkitMaskImage: `radial-gradient(circle at ${corner}, black, transparent 70%)`,
  }
}

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
    <>
      <p className="eyebrow">Featured Resource</p>
      <p className="mt-3 text-[11px] font-semibold tracking-[0.16em] text-arm-media uppercase">
        {FEATURED_RESOURCE.kind}
      </p>
    </>
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
      {/* Desktop: a large right-weighted photograph with a floating content
          panel overlapping its left edge, like a magazine spread rather than
          a 50/50 blog card. */}
      <Reveal className="relative hidden md:block md:h-[460px]">
        <div className="absolute inset-y-0 right-0 w-[70%] overflow-hidden rounded-2xl">
          <Image
            src="/images/chess-knight.png"
            alt="A carved wooden chess knight in dramatic light, symbolizing strategic thinking"
            fill
            sizes="70vw"
            className="object-cover"
            style={{ objectPosition: "62% center" }}
          />
        </div>

        <div className="absolute top-1/2 left-0 w-[46%] -translate-y-1/2 rounded-2xl bg-surface-card p-10 shadow-[0_25px_60px_-32px_rgba(37,24,39,0.35)]">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 rounded-bl-2xl"
            style={chessMotifStyle("bottom left")}
          />
          <div className="relative">
            <ResourceMeta />
            <Headline className="mt-3 text-3xl leading-[1.12] lg:text-[2.25rem]" />
            <p className="mt-4 text-sm text-body">{FEATURED_RESOURCE.description}</p>
            <ResourceCta />
          </div>
        </div>
      </Reveal>

      {/* Mobile: a tall, cinematic photo with the content panel overlapping
          its lower edge — one connected composition, not a stacked card. */}
      <Reveal className="relative md:hidden">
        <div className="relative h-[380px] w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/chess-knight.png"
            alt="A carved wooden chess knight in dramatic light, symbolizing strategic thinking"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "65% center" }}
          />
        </div>

        <div className="relative z-10 -mt-16 mx-4 rounded-2xl bg-surface-card p-6 shadow-[0_20px_45px_-28px_rgba(37,24,39,0.35)]">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 bottom-0 h-16 w-16 rounded-br-2xl"
            style={chessMotifStyle("bottom right")}
          />
          <div className="relative">
            <ResourceMeta />
            <Headline className="mt-3 text-2xl leading-[1.15]" />
            <p className="mt-3 text-sm text-body">{FEATURED_RESOURCE.description}</p>
            <ResourceCta />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

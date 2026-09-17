import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { DecorativeBlob } from "@/components/decorative-blob"
import { ARM_COLOR_CLASS, ARMS, type ArmSlug } from "@/lib/content"

const AUDIENCE_COPY: Record<ArmSlug, { audience: string; description: string }> = {
  consulting: {
    audience: "School Leaders",
    description:
      "Book professional development, instructional coaching, or a discovery call for your team.",
  },
  "mission-139": {
    audience: "Families",
    description:
      "Apply for advocacy support or financial aid for evaluations, therapy, and tutoring.",
  },
  media: {
    audience: "Media & Event Organizers",
    description:
      "Book a keynote, request a webinar, or download the latest research.",
  },
}

export function ThreeWayCta() {
  return (
    <section className="relative overflow-hidden border-t border-hairline bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <DecorativeBlob className="-left-20 top-1/2 size-72 -translate-y-1/2 bg-arm-media/25" />
      <DecorativeBlob className="-right-20 -bottom-20 size-64 bg-arm-consulting/30" />

      <Reveal className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-canvas/60 uppercase">
          Get Involved
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-canvas sm:text-4xl">
          Which part of the ecosystem do you need?
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {ARMS.map((arm) => {
            const copy = AUDIENCE_COPY[arm.slug]
            return (
              <div
                key={arm.slug}
                className="flex flex-col items-start rounded-2xl border border-canvas/15 bg-canvas/5 p-6 text-left"
              >
                <span
                  aria-hidden
                  className={cn("size-2.5 rounded-full", ARM_COLOR_CLASS[arm.color].bg)}
                />
                <p className="mt-3 text-xs font-semibold tracking-[0.14em] text-canvas/60 uppercase">
                  {copy.audience}
                </p>
                <p className="mt-2 text-sm text-canvas/80">{copy.description}</p>
                <Link
                  href={`/ecosystem/${arm.slug}`}
                  className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-canvas"
                >
                  <span className="border-b border-canvas/40 pb-0.5 transition-colors group-hover:border-canvas">
                    {arm.cta}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

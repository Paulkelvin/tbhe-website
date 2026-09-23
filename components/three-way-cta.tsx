import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { ARM_ACTION_HREF, ARM_COLOR_CLASS, type ArmSlug } from "@/lib/content"
import { getArms } from "@/sanity/queries"

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

export async function ThreeWayCta() {
  const ARMS = await getArms()
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
      {/* An oversized, near-invisible echo of the Ecosystem section's
          branching motif — closure, not decoration. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 60"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M50,0 C50,20 14,22 12,50"
          stroke="var(--arm-media)"
          strokeWidth="0.4"
          opacity="0.16"
          filter="url(#sketch-wobble)"
        />
        <path
          d="M50,0 C49,24 51,30 50,60"
          stroke="var(--arm-media)"
          strokeWidth="0.4"
          opacity="0.16"
          filter="url(#sketch-wobble)"
        />
        <path
          d="M50,0 C50,20 86,22 88,50"
          stroke="var(--arm-media)"
          strokeWidth="0.4"
          opacity="0.16"
          filter="url(#sketch-wobble)"
        />
      </svg>

      <Reveal className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:px-8">
        <p className="eyebrow text-canvas/60">
          Get Involved
        </p>
        <h2 className="text-h2 mt-3 text-canvas">
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
                <p className="eyebrow mt-3 text-canvas/60">
                  {copy.audience}
                </p>
                <p className="text-body-sm mt-2 text-canvas/80">{copy.description}</p>
                <Link
                  href={ARM_ACTION_HREF[arm.slug]}
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
                {arm.slug === "mission-139" ? (
                  <Link
                    href="/ecosystem/mission-139#give"
                    className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-arm-mission-ink"
                  >
                    <span className="border-b border-arm-mission-ink/40 pb-0.5 transition-colors group-hover:border-arm-mission-ink">
                      Donate to Mission 139
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                ) : null}
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

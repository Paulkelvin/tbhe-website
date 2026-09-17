import { cn } from "@/lib/utils"
import { ArmCard } from "@/components/arm-card"
import { Reveal } from "@/components/reveal"
import { ARM_COLOR_CLASS, ARMS } from "@/lib/content"

const NODE_POSITIONS = [16.6667, 50, 83.3333]

export function EcosystemOverview() {
  return (
    <section className="section">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-hairline-strong" />
          <p className="eyebrow">One Founder, Three Arms</p>
          <span aria-hidden className="h-px w-8 bg-hairline-strong" />
        </div>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          The TBHE <span className="text-primary italic">Ecosystem</span>
        </h2>
        <p className="mt-4 max-w-xl text-base text-body">
          Educational consulting, special education advocacy, and thought
          leadership — three distinct paths built on one mission.
        </p>
      </Reveal>

      {/* Desktop: one origin branching into three arms, echoed by the numbered
          nodes that sit right on the seam between the graphic and the cards. */}
      <div className="hidden md:block">
        <div aria-hidden className="relative mt-10 h-20 w-full">
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="h-full w-full"
            fill="none"
          >
            <path
              d="M50,4 C50,18 16.6667,18 16.6667,34"
              stroke="var(--arm-consulting)"
              strokeWidth="0.6"
              opacity="0.45"
            />
            <path
              d="M50,4 L50,34"
              stroke="var(--arm-mission)"
              strokeWidth="0.6"
              opacity="0.45"
            />
            <path
              d="M50,4 C50,18 83.3333,18 83.3333,34"
              stroke="var(--arm-media)"
              strokeWidth="0.6"
              opacity="0.45"
            />
            <circle cx="50" cy="4" r="2.4" className="fill-primary" />
          </svg>
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            {ARMS.map((arm, index) => {
              const colors = ARM_COLOR_CLASS[arm.color]
              return (
                <span
                  key={arm.slug}
                  style={{ left: `${NODE_POSITIONS[index]}%` }}
                  className={cn(
                    "absolute flex size-8 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-[11px] font-semibold shadow-[0_0_0_4px_var(--canvas)]",
                    colors.softBg,
                    colors.text
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              )
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {ARMS.map((arm, index) => (
            <Reveal key={arm.slug} delay={index * 0.1} className="h-full">
              <ArmCard arm={arm} index={index} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile: a single connecting line threads down through numbered nodes
          into each arm, leading the eye from Arm 01 to Arm 03. */}
      <div className="relative mt-10 md:hidden">
        <div
          aria-hidden
          className="absolute top-7 bottom-7 left-7 w-px -translate-x-1/2 bg-hairline-strong"
        />
        <div className="flex flex-col gap-8">
          {ARMS.map((arm, index) => {
            const colors = ARM_COLOR_CLASS[arm.color]
            return (
              <Reveal key={arm.slug} delay={index * 0.08} className="relative pl-16">
                <span
                  className={cn(
                    "absolute top-0 left-0 flex size-14 items-center justify-center rounded-full text-sm font-semibold",
                    colors.softBg,
                    colors.text
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ArmCard arm={arm} index={index} />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

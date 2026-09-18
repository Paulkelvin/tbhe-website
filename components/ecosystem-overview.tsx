import { cn } from "@/lib/utils"
import { ArmCard } from "@/components/arm-card"
import { OrganicBlob } from "@/components/organic-art"
import { Reveal } from "@/components/reveal"
import { ARM_COLOR_CLASS, ARMS } from "@/lib/content"

export function EcosystemOverview() {
  return (
    <section className="section relative">
      {/* Bridges into the Impact section below — one shape spanning the seam
          so the two sections read as one continuous canvas. */}
      <OrganicBlob
        color="var(--arm-mission)"
        variant={1}
        filterId="paper-roughen-2"
        rotate={-14}
        className="bottom-[-6%] left-[32%] hidden h-[16%] w-[26%] opacity-[0.07] md:block"
      />

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

      {/* Desktop: a single origin branching into three roots — hand-rendered
          rather than mathematically smooth, echoing an interconnected root
          system more than a flowchart. */}
      <div className="hidden md:block">
        <div aria-hidden className="relative mx-auto mt-14 h-16 w-full max-w-3xl">
          <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-full w-full" fill="none">
            <path
              d="M50,2 C50,14 16.6667,14 16.6667,30"
              stroke="var(--arm-consulting)"
              strokeWidth="0.6"
              opacity="0.4"
              filter="url(#sketch-wobble)"
            />
            <path
              d="M50,2 C49,13 51,18 50,30"
              stroke="var(--arm-mission)"
              strokeWidth="0.6"
              opacity="0.4"
              filter="url(#sketch-wobble)"
            />
            <path
              d="M50,2 C50,14 83.3333,14 83.3333,30"
              stroke="var(--arm-media)"
              strokeWidth="0.6"
              opacity="0.4"
              filter="url(#sketch-wobble)"
            />
            <circle cx="50" cy="2" r="1.4" className="fill-primary" opacity="0.7" />
          </svg>
        </div>

        <div className="relative mt-10 grid gap-6 md:grid-cols-3">
          <OrganicBlob
            color="var(--arm-consulting)"
            variant={0}
            rotate={-6}
            className="top-[-14%] left-[4%] h-[60%] w-[46%] opacity-[0.08]"
          />
          <OrganicBlob
            color="var(--arm-mission)"
            variant={1}
            filterId="paper-roughen-2"
            rotate={10}
            className="top-[20%] left-[36%] h-[70%] w-[42%] opacity-[0.08]"
          />
          <OrganicBlob
            color="var(--arm-media)"
            variant={0}
            rotate={16}
            className="top-[-10%] right-[2%] h-[62%] w-[44%] opacity-[0.09]"
          />

          {ARMS.map((arm, index) => (
            <Reveal key={arm.slug} delay={index * 0.1} className="relative h-full">
              <ArmCard arm={arm} index={index} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile: a quiet vertical "stem" runs behind the cards — hidden where
          a card's own background covers it, visible again in the gaps — with
          a small node marking where each arm meets it. One faint organic
          form peeks from behind the middle card, kept restrained. */}
      <div className="relative mt-10 overflow-hidden md:hidden">
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-11 w-px opacity-40"
          style={{
            background:
              "linear-gradient(to bottom, var(--arm-consulting), var(--arm-mission), var(--arm-media))",
          }}
        />
        <OrganicBlob
          color="var(--arm-mission)"
          variant={1}
          filterId="paper-roughen-2"
          rotate={8}
          className="top-[28%] right-[-10%] h-[26%] w-[48%] opacity-[0.1]"
        />
        <div className="relative flex flex-col gap-6">
          {ARMS.map((arm, index) => {
            const colors = ARM_COLOR_CLASS[arm.color]
            return (
              <Reveal key={arm.slug} delay={index * 0.08} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute -top-1 left-11 size-2.5 -translate-x-1/2 rounded-full shadow-[0_0_0_5px_var(--canvas)]",
                    colors.bg
                  )}
                />
                <ArmCard arm={arm} index={index} />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

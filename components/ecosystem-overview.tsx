import { ArmCard } from "@/components/arm-card"
import { Reveal } from "@/components/reveal"
import { ARMS } from "@/lib/content"

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

      {/* Desktop: a single delicate origin branching into three thin paths,
          a quiet editorial mark rather than a flowchart. */}
      <div className="hidden md:block">
        <div aria-hidden className="relative mx-auto mt-14 h-16 w-full max-w-3xl">
          <svg
            viewBox="0 0 100 32"
            preserveAspectRatio="none"
            className="h-full w-full"
            fill="none"
          >
            <path
              d="M50,2 C50,14 16.6667,14 16.6667,30"
              stroke="var(--arm-consulting)"
              strokeWidth="0.35"
              opacity="0.35"
            />
            <path
              d="M50,2 L50,30"
              stroke="var(--arm-mission)"
              strokeWidth="0.35"
              opacity="0.35"
            />
            <path
              d="M50,2 C50,14 83.3333,14 83.3333,30"
              stroke="var(--arm-media)"
              strokeWidth="0.35"
              opacity="0.35"
            />
            <circle cx="50" cy="2" r="1.4" className="fill-primary" opacity="0.7" />
          </svg>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ARMS.map((arm, index) => (
            <Reveal key={arm.slug} delay={index * 0.1} className="h-full">
              <ArmCard arm={arm} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile: a clean, full-width vertical stack — the connection comes
          from consistent rhythm, not a separate timeline column. */}
      <div className="mt-10 flex flex-col gap-6 md:hidden">
        {ARMS.map((arm, index) => (
          <Reveal key={arm.slug} delay={index * 0.08}>
            <ArmCard arm={arm} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

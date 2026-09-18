import type { Metadata } from "next"
import Link from "next/link"

import { EcosystemHero } from "@/components/ecosystem-hero"
import { OrganicBlob } from "@/components/organic-art"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"
import { ARM_COLOR_CLASS, ARMS, SITE } from "@/lib/content"

export const metadata: Metadata = {
  title: "The Ecosystem — The Beautifully Human Educator",
}

const [consulting, mission, media] = ARMS

export default function EcosystemPage() {
  const consultingColors = ARM_COLOR_CLASS[consulting.color]
  const missionColors = ARM_COLOR_CLASS[mission.color]
  const mediaColors = ARM_COLOR_CLASS[media.color]

  return (
    <>
      <EcosystemHero />

      {/* Three chapters, one thread — a single line runs behind all three
          arms, changing color as it passes through each, rather than three
          identical repeated cards. */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-6 w-px opacity-50 lg:left-1/2 lg:-translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, var(--arm-consulting), var(--arm-mission) 50%, var(--arm-media))",
          }}
        />

        {/* 01 — Consulting */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 pl-14 sm:px-8 sm:pl-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal className="relative">
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute -top-10 -left-2 hidden text-[8rem] leading-none text-arm-consulting/[0.08] sm:block sm:text-[9rem]"
                >
                  01
                </span>
                <p
                  className={cn(
                    "relative text-[11px] font-semibold tracking-[0.2em] uppercase",
                    consultingColors.text
                  )}
                >
                  {consulting.kicker}
                </p>
                <h2 className="font-display relative mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {consulting.name}
                </h2>
                <p className="relative mt-4 max-w-md text-base text-body">
                  {consulting.summary}
                </p>
                <p className="relative mt-4 text-sm text-muted-ink">
                  Serves: {consulting.audience}
                </p>
                <Link
                  href={`/ecosystem/${consulting.slug}`}
                  className={cn(
                    "group relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold",
                    consultingColors.text
                  )}
                >
                  <span className="border-b border-current/40 pb-0.5 transition-colors group-hover:border-current">
                    Explore {consulting.name}
                  </span>
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              </Reveal>

              <Reveal delay={0.08} className="border-l-2 border-arm-consulting/40 pl-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-ink uppercase">
                  What it does
                </p>
                <ul className="mt-3 flex flex-col gap-2.5 text-sm text-body">
                  {consulting.offerings.slice(0, 3).map((offering) => (
                    <li key={offering}>{offering}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 02 — Mission 139 (mirrored) */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 pl-14 sm:px-8 sm:pl-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal delay={0.08} className="order-2 border-l-2 border-arm-mission/40 pl-6 lg:order-1">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-ink uppercase">
                  What it does
                </p>
                <ul className="mt-3 flex flex-col gap-2.5 text-sm text-body">
                  {mission.offerings.slice(0, 3).map((offering) => (
                    <li key={offering}>{offering}</li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="relative order-1 lg:order-2 lg:text-right">
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute -top-10 -right-2 hidden text-[8rem] leading-none text-arm-mission/[0.08] sm:block sm:text-[9rem]"
                >
                  02
                </span>
                <p
                  className={cn(
                    "relative text-[11px] font-semibold tracking-[0.2em] uppercase",
                    missionColors.text
                  )}
                >
                  {mission.kicker}
                </p>
                <h2 className="font-display relative mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {mission.name}
                </h2>
                <p className="relative mt-4 max-w-md text-base text-body lg:ml-auto">
                  {mission.summary}
                </p>
                <p className="relative mt-4 text-sm text-muted-ink">
                  Serves: {mission.audience}
                </p>
                <Link
                  href={`/ecosystem/${mission.slug}`}
                  className={cn(
                    "group relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold lg:justify-end",
                    missionColors.text
                  )}
                >
                  <span className="border-b border-current/40 pb-0.5 transition-colors group-hover:border-current">
                    Explore {mission.name}
                  </span>
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 03 — Media & Publishing, with its own bold cropped-word mark */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <span
            aria-hidden
            className="font-display pointer-events-none absolute top-[-1.5rem] right-[-0.5rem] hidden text-[9rem] leading-none tracking-tight text-arm-media/[0.1] sm:block lg:text-[11rem]"
          >
            MEDIA
          </span>
          <div className="mx-auto max-w-5xl px-6 pl-14 sm:px-8 sm:pl-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal className="relative">
                <p
                  className={cn(
                    "relative text-[11px] font-semibold tracking-[0.2em] uppercase",
                    mediaColors.text
                  )}
                >
                  {media.kicker}
                </p>
                <h2 className="font-display relative mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {media.name}
                </h2>
                <p className="relative mt-4 max-w-md text-base text-body">
                  {media.summary}
                </p>
                <p className="relative mt-4 text-sm text-muted-ink">
                  Serves: {media.audience}
                </p>
                <Link
                  href={`/ecosystem/${media.slug}`}
                  className={cn(
                    "group relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold",
                    mediaColors.text
                  )}
                >
                  <span className="border-b border-current/40 pb-0.5 transition-colors group-hover:border-current">
                    Explore {media.name}
                  </span>
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              </Reveal>

              <Reveal delay={0.08} className="border-l-2 border-arm-media/40 pl-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-ink uppercase">
                  What it does
                </p>
                <ul className="mt-3 flex flex-col gap-2.5 text-sm text-body">
                  {media.offerings.slice(0, 3).map((offering) => (
                    <li key={offering}>{offering}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* The signature moment — plum, sage, and gold overlapping into one
          quiet wash, with the site's own tagline as the payoff. */}
      <section className="relative min-h-[520px] overflow-hidden py-24 sm:min-h-[620px] sm:py-32">
        <OrganicBlob
          color="var(--arm-consulting)"
          variant={0}
          filterId="paper-roughen-torn"
          rotate={-8}
          className="top-[8%] left-[16%] h-[85%] w-[50%] opacity-[0.22] mix-blend-multiply"
        />
        <OrganicBlob
          color="var(--arm-mission)"
          variant={1}
          filterId="paper-roughen-torn"
          rotate={10}
          className="top-[4%] right-[16%] h-[82%] w-[48%] opacity-[0.22] mix-blend-multiply"
        />
        <OrganicBlob
          color="var(--arm-media)"
          variant={0}
          filterId="paper-roughen-torn"
          rotate={16}
          className="top-[18%] left-[32%] h-[70%] w-[44%] opacity-[0.22] mix-blend-multiply"
        />

        <Reveal className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-ink uppercase">
            TBHE
          </p>
          <p className="font-display mt-4 text-2xl font-medium text-ink italic sm:text-3xl">
            {SITE.tagline}
          </p>
        </Reveal>
      </section>

      {/* Pathways in — a quiet closing recap, not a hard sales banner. */}
      <section className="section pt-0">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 border-t border-hairline pt-10 text-center sm:flex-row sm:justify-center sm:gap-10">
          {ARMS.map((arm) => {
            const colors = ARM_COLOR_CLASS[arm.color]
            return (
              <Link
                key={arm.slug}
                href={`/ecosystem/${arm.slug}`}
                className={cn(
                  "group inline-flex items-center gap-1.5 text-sm font-semibold",
                  colors.text
                )}
              >
                <span className="border-b border-current/40 pb-0.5 transition-colors group-hover:border-current">
                  {arm.name}
                </span>
                <span className="transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

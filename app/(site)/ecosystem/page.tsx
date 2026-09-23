import Link from "next/link"

import { EcosystemHero } from "@/components/ecosystem-hero"
import { OrganicBlob } from "@/components/organic-art"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"
import { ARM_COLOR_CLASS } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { getArms, getSiteSettings } from "@/sanity/queries"

export const metadata = pageMetadata({
  title: "The Ecosystem",
  description:
    "Three arms, one mission: Educational Consulting & Coaching, Mission 139 special-education advocacy, and Media & Publishing thought leadership.",
  path: "/ecosystem",
})

export default async function EcosystemPage() {
  const [ARMS, settings] = await Promise.all([getArms(), getSiteSettings()])
  const [consulting, mission, media] = ARMS
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
          <div className="mx-auto max-w-6xl px-6 pl-14 sm:px-8 sm:pl-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal className="relative">
                <p
                  className={cn(
                    "eyebrow relative",
                    consultingColors.text
                  )}
                >
                  {consulting.kicker}
                </p>
                <h2 className="text-h2 relative mt-3 text-ink">
                  {consulting.name}
                </h2>
                <p className="text-lead relative mt-4 max-w-md text-body">
                  {consulting.summary}
                </p>
                <p className="text-body-sm relative mt-4 text-muted-ink">
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
                <p className="eyebrow text-muted-ink">
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
          <div className="mx-auto max-w-6xl px-6 pl-14 sm:px-8 sm:pl-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal delay={0.08} className="order-2 border-l-2 border-arm-mission/40 pl-6 lg:order-1">
                <p className="eyebrow text-muted-ink">
                  What it does
                </p>
                <ul className="mt-3 flex flex-col gap-2.5 text-sm text-body">
                  {mission.offerings.slice(0, 3).map((offering) => (
                    <li key={offering}>{offering}</li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="relative order-1 lg:order-2 lg:text-right">
                <p
                  className={cn(
                    "eyebrow relative",
                    missionColors.text
                  )}
                >
                  {mission.kicker}
                </p>
                <h2 className="text-h2 relative mt-3 text-ink">
                  {mission.name}
                </h2>
                <p className="text-lead relative mt-4 max-w-md text-body lg:ml-auto">
                  {mission.summary}
                </p>
                <p className="text-body-sm relative mt-4 text-muted-ink">
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

        {/* 03 — Media & Publishing */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 pl-14 sm:px-8 sm:pl-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal className="relative">
                <p
                  className={cn(
                    "eyebrow relative",
                    mediaColors.text
                  )}
                >
                  {media.kicker}
                </p>
                <h2 className="text-h2 relative mt-3 text-ink">
                  {media.name}
                </h2>
                <p className="text-lead relative mt-4 max-w-md text-body">
                  {media.summary}
                </p>
                <p className="text-body-sm relative mt-4 text-muted-ink">
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
                <p className="eyebrow text-muted-ink">
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

      {/* The signature moment — completion of the ribbon system introduced
          in the hero. Mobile keeps the simpler overlapping wash; desktop
          resolves the three ribbons into one fully merged form. */}
      <section className="relative min-h-[480px] overflow-hidden py-20 sm:min-h-[560px] sm:py-28 lg:min-h-0 lg:py-0">
        <div className="lg:hidden">
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
        </div>

        {/* Desktop: the three ribbons return, fully merged this time. */}
        <div className="relative hidden aspect-[1440/440] w-full lg:block">
          <svg
            viewBox="0 0 1440 440"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <path
              d="M0,140 C300,160 520,190 660,205 L680,245 C540,230 300,200 0,300 Z"
              fill="var(--arm-consulting)"
              opacity="0.55"
              filter="url(#paper-roughen-torn)"
              style={{ mixBlendMode: "multiply" }}
            />
            <path
              d="M1440,140 C1140,160 920,190 780,205 L760,245 C900,230 1140,200 1440,300 Z"
              fill="var(--arm-mission)"
              opacity="0.55"
              filter="url(#paper-roughen-torn)"
              style={{ mixBlendMode: "multiply" }}
            />
            <path
              d="M660,440 C670,360 685,280 700,220 L740,220 C755,280 770,360 780,440 Z"
              fill="var(--arm-media)"
              opacity="0.55"
              filter="url(#paper-roughen-torn)"
              style={{ mixBlendMode: "multiply" }}
            />
          </svg>
        </div>

        <Reveal className="relative mx-auto max-w-2xl px-6 text-center sm:px-8 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <div className="lg:rounded-full lg:bg-surface-card/85 lg:px-12 lg:py-8 lg:backdrop-blur-[2px]">
            <p className="eyebrow text-muted-ink">
              TBHE
            </p>
            <p className="text-quote mt-4 text-ink lg:mt-3">
              {settings.tagline}
            </p>
          </div>
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

import Link from "next/link"
import { ChalkboardTeacher, PersonSimple, UsersThree } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { DecorativeBlob } from "@/components/decorative-blob"
import { IMPACT_STATS, SITE } from "@/lib/content"

export function Hero() {
  const [workshopsStat, familiesStat] = IMPACT_STATS

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-gradient-to-b from-canvas-soft to-canvas">
      <DecorativeBlob className="-left-24 -top-24 size-80 bg-arm-consulting/20" />
      <DecorativeBlob className="-right-16 top-10 size-72 bg-arm-media/25" />
      <DecorativeBlob className="bottom-[-6rem] left-1/3 size-64 bg-arm-mission/15" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="text-center lg:text-left">
          <p className="eyebrow">{SITE.name}</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            {SITE.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-body sm:text-lg lg:mx-0">
            {SITE.description}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button asChild size="lg">
              <Link href="/ecosystem/consulting">Explore Consulting Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ecosystem/mission-139">Support Mission 139</Link>
            </Button>
          </div>
        </div>

        {/* Swap this whole block for a real cutout photo of the founder once one exists. */}
        <div className="relative mx-auto flex h-[380px] w-full max-w-sm items-end justify-center sm:h-[440px]">
          <div
            aria-hidden
            className="absolute left-1/2 top-6 size-56 -translate-x-1/2 rounded-full border-4 border-arm-media/40"
          />
          <div className="relative flex h-[88%] w-[78%] items-center justify-center rounded-[3rem] bg-gradient-to-b from-primary to-primary-active text-primary-foreground shadow-[0_30px_60px_-20px_rgba(37,24,39,0.35)]">
            <PersonSimple size={140} weight="thin" />
          </div>

          <div className="absolute -left-4 top-10 flex items-center gap-2 rounded-full bg-surface-card px-4 py-2 shadow-lg sm:-left-8">
            <ChalkboardTeacher size={20} weight="duotone" className="text-primary" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">{workshopsStat.value}</p>
              <p className="text-[11px] text-muted-ink">{workshopsStat.label}</p>
            </div>
          </div>

          <div className="absolute -right-4 bottom-10 flex items-center gap-2 rounded-full bg-surface-card px-4 py-2 shadow-lg sm:-right-8">
            <UsersThree size={20} weight="duotone" className="text-arm-mission" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">{familiesStat.value}</p>
              <p className="text-[11px] text-muted-ink">{familiesStat.label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

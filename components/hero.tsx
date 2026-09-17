import Link from "next/link"
import Image from "next/image"
import { ChalkboardTeacher, UsersThree } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { DecorativeBlob } from "@/components/decorative-blob"
import { IMPACT_STATS, SITE } from "@/lib/content"

export function Hero() {
  const [workshopsStat, familiesStat] = IMPACT_STATS

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-gradient-to-br from-arm-consulting/15 via-canvas-soft to-arm-media/20">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(91,42,115,0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <DecorativeBlob className="-left-28 -top-28 size-96 bg-arm-consulting/30" />
      <DecorativeBlob className="-right-24 top-0 size-[26rem] bg-arm-media/35" />
      <DecorativeBlob className="bottom-[-8rem] left-1/4 size-80 bg-arm-mission/25" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:py-20">
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

        <div className="relative mx-auto aspect-[888/1039] w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px]">
          <div
            aria-hidden
            className="absolute left-[53%] top-[19%] size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-arm-media sm:size-56 lg:size-72"
          />

          <Image
            src="/images/founder-hero.png"
            alt="Founder of The Beautifully Human Educator"
            fill
            priority
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 520px"
            className="object-contain object-bottom"
          />

          <div className="absolute left-0 top-[26%] flex items-center gap-2 rounded-full bg-surface-card px-4 py-2 shadow-xl">
            <ChalkboardTeacher size={20} weight="duotone" className="text-primary" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">{workshopsStat.value}</p>
              <p className="text-[11px] text-muted-ink">{workshopsStat.label}</p>
            </div>
          </div>

          <div className="absolute right-0 top-[58%] flex items-center gap-2 rounded-full bg-surface-card px-4 py-2 shadow-xl">
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

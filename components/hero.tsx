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

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-6 pt-16 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-stretch lg:gap-8 lg:min-h-[640px] lg:pt-0">
        <div className="flex flex-col justify-center text-center lg:text-left">
          <p className="eyebrow">{SITE.name}</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            {SITE.taglineLead}
          </h1>
          <p className="mt-2 text-xl font-medium text-body-strong sm:text-2xl">
            {SITE.taglineSub}
          </p>
          <p className="mx-auto mt-5 max-w-md text-sm text-body lg:mx-0">
            {SITE.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button asChild size="lg">
              <Link href="/ecosystem/consulting">Explore Consulting Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ecosystem/mission-139">Support Mission 139</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[555/1018] w-full max-w-[300px] sm:max-w-[360px] lg:h-full lg:max-w-[420px]">
          <div
            aria-hidden
            className="absolute left-[43%] top-[18%] size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-arm-media sm:size-48 lg:size-56"
          />

          <Image
            src="/images/founder-hero.png"
            alt="Founder of The Beautifully Human Educator"
            fill
            priority
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
            className="object-contain object-bottom"
          />

          <div className="absolute left-[2%] top-[24%] flex items-center gap-2 rounded-full bg-surface-card px-4 py-2 shadow-xl">
            <ChalkboardTeacher size={20} weight="duotone" className="text-primary" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">{workshopsStat.value}</p>
              <p className="text-[11px] text-muted-ink">{workshopsStat.label}</p>
            </div>
          </div>

          <div className="absolute right-[2%] top-[44%] flex items-center gap-2 rounded-full bg-surface-card px-4 py-2 shadow-xl">
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

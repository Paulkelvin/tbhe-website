import Link from "next/link"
import Image from "next/image"
import {
  ChalkboardTeacher,
  CheckCircle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { HERO_TRUST_MARKERS, IMPACT_STATS, SITE } from "@/lib/content"

export function Hero() {
  const [workshopsStat, familiesStat] = IMPACT_STATS

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas-soft">
      {/* Designed background: crisp shapes, not blurred gradients. */}
      <div
        aria-hidden
        className="absolute -left-16 -top-16 size-72 rounded-full border-2 border-arm-consulting/40 sm:size-80"
      />
      <div
        aria-hidden
        className="absolute -right-10 top-10 size-40 rounded-full border-2 border-arm-mission/40"
      />
      <div
        aria-hidden
        className="absolute bottom-10 left-8 h-28 w-28 opacity-70 sm:h-36 sm:w-36"
        style={{
          backgroundImage:
            "radial-gradient(rgba(196,134,44,0.55) 2.5px, transparent 2.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div aria-hidden className="absolute left-[38%] top-12 size-3 rounded-full bg-arm-media" />
      <div aria-hidden className="absolute bottom-[6%] left-[3%] size-4 rounded-full bg-arm-mission" />
      <div aria-hidden className="absolute right-[6%] bottom-16 size-5 rounded-full bg-arm-consulting" />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-6 pt-16 sm:px-10 lg:grid-cols-[1fr_1.05fr] lg:items-stretch lg:gap-8 lg:min-h-[640px] lg:px-16 lg:pt-0 xl:px-20">
        <div className="flex flex-col justify-center text-center lg:text-left">
          <p className="eyebrow">{SITE.name}</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-primary sm:text-6xl">
            {SITE.taglineLead}
          </h1>
          <p className="mt-2 text-xl font-medium text-body-strong sm:text-2xl">
            {SITE.taglineSub}
          </p>
          <p className="mx-auto mt-5 max-w-md text-sm text-body lg:mx-0">
            {SITE.description}
          </p>

          <ul className="mx-auto mt-5 flex max-w-md flex-wrap justify-center gap-x-5 gap-y-2 lg:mx-0 lg:justify-start">
            {HERO_TRUST_MARKERS.map((marker) => (
              <li
                key={marker}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-ink"
              >
                <CheckCircle size={16} weight="fill" className="text-arm-mission" />
                {marker}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button asChild size="lg">
              <Link href="/ecosystem/consulting">Explore Consulting Services</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-arm-media text-ink hover:bg-arm-media/85"
            >
              <Link href="/ecosystem/mission-139">Support Mission 139</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[906/1046] w-full max-w-[380px] sm:max-w-[440px] lg:h-full lg:max-w-[520px]">
          <div
            aria-hidden
            className="absolute left-[52%] top-[17%] size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-arm-media sm:size-40 lg:size-48"
          />

          <Image
            src="/images/founder-hero.png"
            alt="Founder of The Beautifully Human Educator"
            fill
            priority
            sizes="(max-width: 640px) 380px, (max-width: 1024px) 440px, 520px"
            className="object-contain object-bottom"
          />

          <div className="absolute left-[0%] top-[6%] flex items-center gap-2 rounded-full bg-surface-card px-4 py-2 shadow-xl">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <ChalkboardTeacher size={18} weight="fill" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">{workshopsStat.value}</p>
              <p className="text-[11px] text-muted-ink">{workshopsStat.label}</p>
            </div>
          </div>

          <div className="absolute right-[0%] top-[36%] flex items-center gap-2 rounded-full bg-surface-card px-4 py-2 shadow-xl">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-arm-mission text-white">
              <UsersThree size={18} weight="fill" />
            </span>
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

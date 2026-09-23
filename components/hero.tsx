import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ArtDefs, OrganicBlob, OrganicOutline } from "@/components/organic-art"
import { cn } from "@/lib/utils"
import { ARM_COLOR_CLASS } from "@/lib/content"
import { getArms, getSiteSettings } from "@/sanity/queries"

export async function Hero() {
  const [settings, ARMS] = await Promise.all([getSiteSettings(), getArms()])
  const FOUNDER_ALT = `${settings.founderName}, founder of ${settings.siteName}, laughing and gesturing warmly in a green blazer`

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas-soft">
      <ArtDefs />

      {/* Background depth, behind everything. Simplified on mobile: one
          small quiet accent behind her instead of the full desktop layering,
          kept clear of the body copy. */}
      <OrganicBlob
        color="var(--arm-media)"
        variant={0}
        filterId="paper-roughen-torn"
        rotate={-6}
        className="top-[52%] right-[-10%] z-0 h-[30%] w-[42%] opacity-[0.28] sm:top-[50%] lg:top-[-10%] lg:right-[1%] lg:h-[85%] lg:w-[52%]"
      />
      <OrganicBlob
        color="var(--arm-mission)"
        variant={1}
        filterId="paper-roughen-2"
        rotate={-14}
        className="bottom-[16%] left-[42%] z-0 hidden h-[20%] w-[16%] opacity-[0.16] lg:block"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-14 sm:px-10 lg:px-16 lg:pt-0 xl:px-20">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_1fr] lg:items-center">
          {/* Content */}
          <div className="relative z-20 flex flex-col justify-center py-4 text-center lg:py-24 lg:text-left">
            <p className="eyebrow">{settings.siteName}</p>
            <h1 className="text-display mt-5 text-primary">
              {settings.tagline}
            </h1>
            <p className="text-h3 mt-2 text-body-strong">
              {settings.taglineSub}
            </p>
            <p className="text-body-sm mx-auto mt-5 max-w-md text-body lg:mx-0">
              {settings.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button asChild size="lg">
                <Link href="/ecosystem/consulting">Explore Consulting Services</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-arm-media text-ink hover:bg-arm-media/85"
              >
                <Link href="/donate">Support Mission 139</Link>
              </Button>
            </div>
          </div>

          {/* Mobile / tablet: founder in normal flow, cropped tighter than
              the old version so she reads as large and expressive without
              a lot of surrounding air. */}
          <div className="relative z-10 -mt-2 lg:hidden">
            <div className="relative mx-auto aspect-[6/5] w-full max-w-[420px] sm:max-w-[480px]">
              <Image
                src="/images/founder-hero.png"
                alt={FOUNDER_ALT}
                fill
                priority
                sizes="(max-width: 640px) 420px, 480px"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Desktop grid cell — the actual image is absolutely positioned
              (below) so it can dominate and overlap the gutter; this cell
              just reserves the column width. */}
          <div aria-hidden className="hidden lg:block" />
        </div>
      </div>

      {/* Desktop: the founder, large and confidently cropped — object-cover
          from the top so she's cut off at the lower torso/thigh rather than
          shrunk to fit. Positioned to bleed slightly into the content
          column's gutter so her reaching hand connects the two halves.
          Anchored inside the same max-w-[1440px] bound as the content grid
          (rather than the full-bleed section) so her crop and the outline
          layered over her stay consistent instead of drifting on very wide
          viewports. */}
      <div className="pointer-events-none absolute inset-0 z-10 mx-auto hidden max-w-[1440px] lg:block">
        <div className="absolute inset-y-0 right-0 w-[54%]">
          <Image
            src="/images/founder-hero.png"
            alt={FOUNDER_ALT}
            fill
            priority
            sizes="54vw"
            className="object-cover object-top"
            style={{ objectPosition: "50% 0%" }}
          />
        </div>

        {/* A thin plum outline layered mostly behind her, one loop crossing
            in front near her shoulder for genuine foreground depth. */}
        <OrganicOutline
          color="var(--arm-consulting)"
          variant={1}
          filterId="paper-roughen-2"
          rotate={8}
          strokeWidth={1.6}
          className="top-[4%] right-[6%] h-[62%] w-[38%] opacity-[0.55]"
        />
      </div>

      {/* Ecosystem strip — a slim editorial anchor, not a feature bar. */}
      <div className="relative z-30 border-t border-hairline bg-canvas-soft">
        <nav
          aria-label="The TBHE ecosystem"
          className="mx-auto flex max-w-[1440px] flex-col items-center gap-2 px-6 py-4 text-center sm:flex-row sm:justify-center sm:gap-10 sm:px-10 lg:justify-between lg:px-16 xl:px-20"
        >
          {ARMS.map((arm, index) => (
            <Link
              key={arm.slug}
              href={`/ecosystem/${arm.slug}`}
              className={cn(
                "eyebrow relative transition-opacity hover:opacity-70",
                "sm:before:absolute sm:before:top-1/2 sm:before:-left-5 sm:before:h-3 sm:before:w-px sm:before:-translate-y-1/2 sm:before:bg-hairline-strong sm:before:content-['']",
                index === 0 && "sm:before:hidden",
                ARM_COLOR_CLASS[arm.color].text
              )}
            >
              {arm.name}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}

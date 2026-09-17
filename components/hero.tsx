import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ArtDefs, HandDrawnStroke, OrganicBlob } from "@/components/organic-art"
import { SITE } from "@/lib/content"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas-soft">
      <ArtDefs />

      {/* A hand-drawn stroke loosely connecting the supporting line to the
          founder/books, only where the two-column layout exists. */}
      <HandDrawnStroke
        className="pointer-events-none absolute top-[42%] left-[38%] hidden h-24 w-[18%] lg:block"
        d="M2,40 C20,10 45,55 70,25 C82,12 92,20 98,4"
        color="var(--primary)"
        strokeWidth={1.4}
        viewBox="0 0 100 60"
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-6 pt-16 sm:px-10 lg:grid-cols-[1fr_1.05fr] lg:items-stretch lg:gap-8 lg:min-h-[640px] lg:px-16 lg:pt-0 xl:px-20">
        <div className="flex flex-col justify-center text-center lg:text-left">
          <p className="eyebrow">{SITE.name}</p>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-primary sm:text-6xl">
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
            <Button
              asChild
              size="lg"
              className="bg-arm-media text-ink hover:bg-arm-media/85"
            >
              <Link href="/ecosystem/mission-139">Support Mission 139</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[906/1046] w-full max-w-[400px] sm:max-w-[470px] lg:h-full lg:max-w-[600px]">
          {/* Warm-gold painted form behind the raised hand and books. */}
          <OrganicBlob
            color="var(--arm-media)"
            variant={0}
            rotate={-8}
            className="top-[-4%] left-[-6%] h-[42%] w-[52%] opacity-[0.22]"
          />
          {/* Pale sage form near her open-hand gesture, lower right. */}
          <OrganicBlob
            color="var(--arm-mission)"
            variant={1}
            filterId="paper-roughen-2"
            rotate={12}
            className="top-[46%] right-[-8%] h-[34%] w-[40%] opacity-[0.14]"
          />

          {/* Thin halo ring behind her head, like the reference's single blue ring. */}
          <div
            aria-hidden
            className="absolute left-[52%] top-[17%] size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-arm-consulting/45 sm:size-40 lg:size-48"
          />

          <Image
            src="/images/founder-hero.png"
            alt="Founder of The Beautifully Human Educator"
            fill
            priority
            sizes="(max-width: 640px) 380px, (max-width: 1024px) 440px, 520px"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  )
}

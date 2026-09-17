import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DecorativeBlob } from "@/components/decorative-blob"
import { SITE } from "@/lib/content"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-gradient-to-b from-canvas-soft to-canvas">
      <DecorativeBlob className="-left-24 -top-24 size-80 bg-arm-consulting/20" />
      <DecorativeBlob className="-right-16 top-10 size-72 bg-arm-media/25" />
      <DecorativeBlob className="bottom-[-6rem] left-1/3 size-64 bg-arm-mission/15" />

      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
        <p className="eyebrow">{SITE.name}</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
          {SITE.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-body sm:text-lg">
          {SITE.description}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/ecosystem/consulting">Explore Consulting Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/ecosystem/mission-139">Support Mission 139</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

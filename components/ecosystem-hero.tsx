import { ArtDefs } from "@/components/organic-art"

// Page-specific hero for /ecosystem only — bold typography rather than a
// centered PageHero heading, with a small TBHE mark as the anchor three
// thin colored threads will extend from as the page scrolls.
export function EcosystemHero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas">
      <ArtDefs />
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-8 sm:py-20">
        <p className="eyebrow text-primary">The Ecosystem</p>

        <div className="mt-5 leading-[0.95]">
          <span className="font-display block text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
            Three Arms
          </span>
          <span className="mt-1 flex items-center justify-center gap-3 sm:gap-4">
            <span className="font-display text-5xl font-semibold tracking-tight text-primary italic sm:text-7xl">
              One Mission
            </span>
          </span>
          <span className="mt-4 flex items-center justify-center gap-1.5" aria-hidden>
            <span className="h-1 w-6 rounded-full bg-arm-consulting sm:w-8" />
            <span className="h-1 w-6 rounded-full bg-arm-mission sm:w-8" />
            <span className="h-1 w-6 rounded-full bg-arm-media sm:w-8" />
          </span>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-base text-body sm:text-lg">
          Consulting for schools, advocacy for families, and thought
          leadership for the field — each built to stand on its own and
          stronger together.
        </p>
      </div>
    </section>
  )
}

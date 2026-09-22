import Image from "next/image"

const RESOURCE_HERO_ALT =
  "A TBHE research publication, 'Research for a Fairer Education Tomorrow,' open to a spread titled 'From Insight to Impact' beside a classroom photograph and key findings chart, on a desk with a stack of books labeled Education, Equity, Policy, and Opportunity"

// Page-specific hero for /resources only — an asymmetric editorial pairing
// of the supplied publication photograph with the page's heading, distinct
// from PageHero's centered layout used by About/Ecosystem/Events/Contact.
export function ResourceHero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.2fr] lg:items-center lg:gap-6 lg:py-20">
        <div className="relative z-10 text-center lg:text-left">
          <p className="eyebrow text-primary">Resource Center</p>
          <h1 className="text-h1 mt-4 text-ink">
            White papers, tools, and resources for the educator community
          </h1>
          <p className="text-lead mx-auto mt-5 max-w-md text-body lg:mx-0">
            Research from across the ecosystem, free to read, download, and
            share. New categories are added as the library grows.
          </p>
        </div>

        {/* Mobile: a tighter, deliberate crop into the open publication
            spread rather than the full flat-lay scene. */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md lg:hidden">
          <Image
            src="/images/resource-hero.png"
            alt={RESOURCE_HERO_ALT}
            fill
            sizes="90vw"
            className="object-cover"
            style={{ objectPosition: "58% 48%" }}
          />
        </div>

        {/* Desktop: the full composition, bleeding past the section's right
            edge — its own soft vignette does the rest. */}
        <div className="relative -mr-6 hidden aspect-[16/10] w-full lg:-mr-20 lg:block">
          <Image
            src="/images/resource-hero.png"
            alt={RESOURCE_HERO_ALT}
            fill
            sizes="60vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}

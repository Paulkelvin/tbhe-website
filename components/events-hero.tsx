import Image from "next/image"

const EVENTS_PHOTO_ALT =
  "A small group of educators laughing and talking around a table at a Disrupt & Connect gathering, notebooks and coffee in hand, with 'Ideas People Policy Progress' and 'Better Education Brighter Futures' signage in the background"

// Page-specific hero for /events only — an asymmetric pairing of the
// gathering photograph (confidently cropped, not a generic image card)
// with the page's heading, distinct from PageHero's centered layout.
export function EventsHero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10 lg:py-20">
        <div className="relative z-10 text-center lg:text-left">
          <p className="eyebrow text-primary">Events</p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Workshops, webinars, and Disrupt &amp; Connect meetups
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base text-body sm:text-lg lg:mx-0">
            Upcoming programming across all three arms of the ecosystem.
          </p>
        </div>

        {/* Mobile: a wide, tightly cropped strip on the people themselves. */}
        <div className="relative -mx-6 aspect-[16/11] w-[calc(100%+3rem)] sm:mx-0 sm:w-full lg:hidden">
          <Image
            src="/images/events-hero.jpg"
            alt={EVENTS_PHOTO_ALT}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "38% 55%" }}
          />
        </div>

        {/* Desktop: a deliberate portrait-leaning crop bleeding past the
            section's right edge. */}
        <div className="relative -mr-6 hidden aspect-[6/5] w-full lg:-mr-20 lg:block">
          <Image
            src="/images/events-hero.jpg"
            alt={EVENTS_PHOTO_ALT}
            fill
            sizes="65vw"
            className="object-cover"
            style={{ objectPosition: "38% 45%" }}
          />
        </div>
      </div>
    </section>
  )
}

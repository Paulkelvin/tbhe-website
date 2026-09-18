import type { Metadata } from "next"
import Link from "next/link"

import { EventsHero } from "@/components/events-hero"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { EVENTS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Events — The Beautifully Human Educator",
}

const [featuredEvent, ...otherEvents] = EVENTS
const seasonMatch = featuredEvent.title.match(/\b(Spring|Summer|Fall|Winter)\b/)

export default function EventsPage() {
  return (
    <>
      <EventsHero />

      <section className="section">
        <div className="mx-auto max-w-4xl">
          {/* Featured — a tinted zone with a dashed "ticket stub" divider,
              not a bordered card. The event's own season word (real text
              from the title) becomes the oversized editorial mark. */}
          <Reveal className="relative overflow-hidden bg-primary/[0.045] px-7 py-9 sm:px-10 sm:py-11">
            {seasonMatch ? (
              <span
                aria-hidden
                className="font-display pointer-events-none absolute top-2 right-4 select-none text-[6rem] leading-none tracking-tight text-arm-media/[0.12] uppercase sm:top-0 sm:text-[8rem]"
              >
                {seasonMatch[0]}
              </span>
            ) : null}

            <p className="relative text-[11px] font-semibold tracking-[0.2em] text-arm-media-ink uppercase">
              Disrupt &amp; Connect
            </p>
            <div className="relative mt-5 border-t border-dashed border-hairline-strong pt-5">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-ink uppercase">
                Featured Event &middot; {featuredEvent.type}
              </p>
              <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {featuredEvent.title}
              </h2>
              <p className="mt-4 max-w-xl text-base text-body">
                {featuredEvent.description}
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary">
                <span className="border-b border-primary/40 pb-0.5">
                  Learn more
                </span>
                <span aria-hidden>&rarr;</span>
              </span>
            </div>
          </Reveal>

          {/* Also on the programme — a quiet editorial list for the rest. */}
          <div className="mt-4">
            <p className="border-t border-hairline pt-8 text-[11px] font-semibold tracking-[0.16em] text-muted-ink uppercase">
              Also on the Programme
            </p>
            <div className="mt-2 divide-y divide-hairline">
              {otherEvents.map((event, index) => (
                <Reveal
                  key={event.title}
                  delay={index * 0.06}
                  className="flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div className="sm:max-w-xl">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-ink uppercase">
                      {event.type}
                    </p>
                    <h3 className="font-display mt-1.5 text-xl font-semibold text-ink">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm text-body">{event.description}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary sm:pl-4">
                    Learn more &rarr;
                  </span>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Continue — a compact, quiet close, not another major section.
              The oversized ampersand is the one creative detail, cropped
              from Disrupt & Connect's own name rather than invented. */}
          <Reveal className="relative mt-16 overflow-hidden border-t border-hairline pt-9 pb-1 sm:mt-20 sm:pt-10">
            <span
              aria-hidden
              className="font-display pointer-events-none absolute -top-8 right-0 select-none text-[8rem] leading-none text-arm-media/[0.14] sm:-top-11 sm:text-[10rem]"
            >
              &amp;
            </span>

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
              <div className="max-w-sm">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Bring Disrupt &amp; Connect to your community.
                </h2>
                <p className="mt-2.5 text-sm text-body sm:text-base">
                  Want to bring Disrupt &amp; Connect, a workshop, or a
                  webinar to your school or district?
                </p>
              </div>
              <Button asChild size="lg" className="w-fit shrink-0">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

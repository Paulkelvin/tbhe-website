import Link from "next/link"

import { EventsHero } from "@/components/events-hero"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { EVENTS } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Events",
  description:
    "Workshops, webinars, and Disrupt & Connect community meetups from The Beautifully Human Educator. New programming is announced here first.",
  path: "/events",
})

export default function EventsPage() {
  return (
    <>
      <EventsHero />

      <section className="section">
        <div className="mx-auto max-w-4xl">
          {EVENTS.length === 0 ? (
            <Reveal className="relative overflow-hidden bg-primary/[0.045] px-7 py-14 text-center sm:px-10 sm:py-16">
              <p className="eyebrow text-arm-media-ink">Coming Soon</p>
              <h2 className="text-h2 mx-auto mt-4 max-w-xl text-ink">
                New events, learning opportunities, and community
                experiences are coming soon.
              </h2>
              <p className="text-lead mx-auto mt-4 max-w-md text-body">
                Check back for updates as TBHE completes its rebrand.
              </p>
            </Reveal>
          ) : (
            <div className="divide-y divide-hairline border-t border-hairline">
              {EVENTS.map((event, index) => (
                <Reveal
                  key={event.title}
                  delay={index * 0.06}
                  className="flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div className="sm:max-w-xl">
                    <p className="eyebrow text-muted-ink">{event.type}</p>
                    <h3 className="text-h3 mt-1.5 text-ink">
                      {event.title}
                    </h3>
                    <p className="text-body-sm mt-2 text-body">
                      {event.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

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
                <h2 className="text-h3 text-ink">
                  Bring Disrupt &amp; Connect to your community.
                </h2>
                <p className="text-body-sm mt-2.5 text-body">
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

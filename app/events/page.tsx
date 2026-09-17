import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Badge } from "@/components/ui/badge"
import { EVENTS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Events — The Beautifully Human Educator",
}

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Workshops, webinars, and Disrupt & Connect meetups"
        description="Upcoming programming across all three arms of the ecosystem."
      />

      <section className="section">
        <div className="relative mx-auto max-w-2xl">
          <div
            aria-hidden
            className="absolute left-[15px] top-2 bottom-2 w-px bg-hairline-strong"
          />
          <div className="flex flex-col gap-10">
            {EVENTS.map((event, index) => (
              <Reveal key={event.title} delay={index * 0.08} className="relative pl-12">
                <span className="absolute left-0 top-0 flex size-[31px] items-center justify-center rounded-full border-2 border-primary bg-canvas text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <Badge variant="secondary" className="w-fit">
                  {event.type}
                </Badge>
                <h3 className="mt-3 text-base font-semibold text-ink">
                  {event.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-body">
                  {event.description}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-primary">
                  Learn more &rarr;
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

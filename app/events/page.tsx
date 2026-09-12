import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
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
        <div className="grid gap-6">
          {EVENTS.map((event) => (
            <div
              key={event.title}
              className="flex flex-col gap-3 rounded-2xl border border-hairline bg-surface-card p-6 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <Badge variant="secondary" className="w-fit">
                  {event.type}
                </Badge>
                <h3 className="mt-3 text-base font-semibold text-ink">
                  {event.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-body">
                  {event.description}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-primary">
                Learn more &rarr;
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

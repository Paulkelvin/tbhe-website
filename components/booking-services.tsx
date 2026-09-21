"use client"

import { useState } from "react"

import { BookingWidget } from "@/components/booking-widget"
import { cn } from "@/lib/utils"
import { BOOKABLE_SERVICES } from "@/lib/content"

// Three real, separately-bookable Cal.com event types, not just the one
// discovery call the site used to assume was the only option.
export function BookingServices() {
  const [active, setActive] = useState(BOOKABLE_SERVICES[0])

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {BOOKABLE_SERVICES.map((service) => (
          <button
            key={service.key}
            type="button"
            onClick={() => setActive(service)}
            aria-pressed={active.key === service.key}
            className={cn(
              "caption rounded-full border px-4 py-2 transition-colors",
              active.key === service.key
                ? "border-arm-consulting bg-arm-consulting text-white"
                : "border-hairline-strong bg-surface-card text-body hover:border-arm-consulting/50"
            )}
          >
            {service.title}
            {service.duration ? ` · ${service.duration}` : ""}
          </button>
        ))}
      </div>

      <p className="text-quote mt-5 text-primary/80">{active.tagline}</p>

      <div className="mt-6">
        <BookingWidget calLink={active.calLink} />
      </div>
    </div>
  )
}

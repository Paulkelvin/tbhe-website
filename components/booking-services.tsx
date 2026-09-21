"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ChalkboardTeacher,
  Handshake,
  Phone,
} from "@phosphor-icons/react/dist/ssr"

import { BookingWidget } from "@/components/booking-widget"
import { cn } from "@/lib/utils"
import { BOOKABLE_SERVICES, type BookableService } from "@/lib/content"

// Icon shown in place of a real photo until one is supplied for that
// service — a plain fallback, not meant to be the finished look.
const FALLBACK_ICON: Record<string, typeof Phone> = {
  discovery: Phone,
  executive: Handshake,
  classroom: ChalkboardTeacher,
}

function ServiceCard({
  service,
  active,
  onSelect,
}: {
  service: BookableService
  active: boolean
  onSelect: () => void
}) {
  const Icon = FALLBACK_ICON[service.key] ?? Phone

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-surface-card text-left transition-all",
        active
          ? "border-arm-consulting shadow-[0_20px_45px_-24px_rgba(37,24,39,0.35)]"
          : "border-hairline hover:border-arm-consulting/40"
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-arm-consulting/5">
        {service.image ? (
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon size={36} weight="light" className="text-arm-consulting/30" />
          </div>
        )}
        {service.duration ? (
          <span className="caption absolute top-3 right-3 rounded-full bg-surface-card/90 px-3 py-1 text-ink">
            {service.duration}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="text-h3-alt text-ink">{service.title}</h3>
        <p className="text-body-sm mt-1 text-body italic">{service.tagline}</p>
      </div>
      {active ? (
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl ring-2 ring-arm-consulting"
        />
      ) : null}
    </button>
  )
}

// Three real, separately-bookable Cal.com event types, presented as cards
// (not plain pill buttons) so each service feels like a real offering
// rather than an option in a dropdown.
export function BookingServices() {
  const [active, setActive] = useState(BOOKABLE_SERVICES[0])

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {BOOKABLE_SERVICES.map((service) => (
          <ServiceCard
            key={service.key}
            service={service}
            active={active.key === service.key}
            onSelect={() => setActive(service)}
          />
        ))}
      </div>

      <div className="mt-6">
        <BookingWidget calLink={active.calLink} />
      </div>
    </div>
  )
}

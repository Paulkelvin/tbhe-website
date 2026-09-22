"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChalkboardTeacher,
  GraduationCap,
  Handshake,
  Phone,
} from "@phosphor-icons/react/dist/ssr"

import { BookingWidget } from "@/components/booking-widget"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  BOOKABLE_SERVICES,
  type BookableService,
  type ServiceCategory,
} from "@/lib/content"

// Icon shown in place of a real photo until one is supplied for that
// service — a plain fallback, not meant to be the finished look.
const FALLBACK_ICON: Record<string, typeof Phone> = {
  discovery: Phone,
  executive: Handshake,
  classroom: ChalkboardTeacher,
  "professional-development": GraduationCap,
}

// Mirrors the real site's own "All Services" / "For Educators" /
// "For Schools & Districts" filter — picking a category narrows the row
// to the relevant cards instead of always showing all four at once.
type ServiceFilter = "all" | ServiceCategory

const FILTERS: { key: ServiceFilter; label: string }[] = [
  { key: "all", label: "All Services" },
  { key: "educator", label: "For Educators" },
  { key: "school", label: "For Schools & Districts" },
]

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
            alt={service.imageAlt ?? ""}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
            style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined}
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

function servicesFor(filter: ServiceFilter): readonly BookableService[] {
  return filter === "all"
    ? BOOKABLE_SERVICES
    : BOOKABLE_SERVICES.filter((s) => s.category === filter)
}

export function BookingServices() {
  const [filter, setFilter] = useState<ServiceFilter>("all")
  const servicesInView = servicesFor(filter)
  const [activeKey, setActiveKey] = useState(servicesInView[0].key)
  const active =
    BOOKABLE_SERVICES.find((s) => s.key === activeKey) ?? servicesInView[0]

  function selectFilter(next: ServiceFilter) {
    setFilter(next)
    const first = servicesFor(next)[0]
    if (first) setActiveKey(first.key)
  }

  return (
    <div>
      <div className="inline-flex flex-wrap gap-1 rounded-full border border-hairline bg-surface-card p-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => selectFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              filter === f.key
                ? "bg-arm-consulting text-canvas"
                : "text-body hover:text-ink"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "mt-6 grid gap-4 sm:grid-cols-2",
          servicesInView.length > 2 && "lg:grid-cols-4"
        )}
      >
        {servicesInView.map((service) => (
          <ServiceCard
            key={service.key}
            service={service}
            active={active.key === service.key}
            onSelect={() => setActiveKey(service.key)}
          />
        ))}
      </div>

      <div className="mt-6">
        {active.category === "educator" ? (
          <BookingWidget calLink={active.calLink} />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-hairline bg-arm-consulting/5 px-6 py-14 text-center">
            <p className="text-h3 text-ink">
              Let&apos;s build a proposal for your team.
            </p>
            <p className="text-body-sm max-w-md text-body">
              School and district engagements are scoped around your staff
              size and goals, so this one starts with a quote rather than a
              calendar. Tell us what you need and we&apos;ll follow up.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

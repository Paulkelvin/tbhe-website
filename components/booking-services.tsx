"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChalkboardTeacher,
  CheckCircle,
  GraduationCap,
  Handshake,
  Phone,
} from "@phosphor-icons/react/dist/ssr"

import { BookingWidget } from "@/components/booking-widget"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { BookableService } from "@/sanity/queries"

// Icon shown in place of a real photo until one is supplied for that
// service — a plain fallback, not meant to be the finished look. Cycled
// by position since services no longer carry a fixed icon key.
const FALLBACK_ICONS = [Phone, Handshake, ChalkboardTeacher, GraduationCap]

// Mirrors the real site's own "All Services" / "For Educators" /
// "For Schools & Districts" filter — picking a category narrows the row
// to the relevant cards instead of always showing all four at once.
type ServiceFilter = "all" | BookableService["category"]

const FILTERS: { key: ServiceFilter; label: string }[] = [
  { key: "all", label: "All Services" },
  { key: "educator", label: "For Educators" },
  { key: "school", label: "For Schools & Districts" },
]

function ServiceCard({
  service,
  index,
  active,
  onSelect,
}: {
  service: BookableService
  index: number
  active: boolean
  onSelect: () => void
}) {
  const Icon = FALLBACK_ICONS[index % FALLBACK_ICONS.length]

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
        {active ? (
          <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-arm-consulting px-3 py-1 text-xs font-semibold text-canvas shadow-sm">
            <CheckCircle size={14} weight="fill" />
            Selected
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="text-h3-alt text-ink">{service.title}</h3>
        <p className="text-body-sm mt-1 text-body italic">{service.description}</p>
        {!active ? (
          <p className="text-body-sm mt-2 font-semibold text-arm-consulting">
            {service.category === "educator" ? "See availability ↓" : "Get a quote ↓"}
          </p>
        ) : null}
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

export function BookingServices({ services }: { services: BookableService[] }) {
  function servicesFor(filter: ServiceFilter) {
    return filter === "all" ? services : services.filter((s) => s.category === filter)
  }

  const [filter, setFilter] = useState<ServiceFilter>("all")
  const servicesInView = servicesFor(filter)
  const [activeTitle, setActiveTitle] = useState(servicesInView[0]?.title)
  const active =
    services.find((s) => s.title === activeTitle) ?? servicesInView[0]
  const panelRef = useRef<HTMLDivElement>(null)

  function selectFilter(next: ServiceFilter) {
    setFilter(next)
    const first = servicesFor(next)[0]
    if (first) setActiveTitle(first.title)
  }

  function selectService(title: string) {
    setActiveTitle(title)
    // The calendar/quote panel below is the whole point of picking a
    // card, so bring it into view rather than leaving people to notice
    // it changed further down the page.
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  return (
    <div>
      {/* A horizontally-scrolling row rather than flex-wrap: three pills
          plus their padding don't fit one line on narrow phones, and
          wrapping breaks the rounded-full container into a lopsided
          shape. Stays within the normal content edges (no bleed) —
          swiping reveals the rest instead of it hanging off-screen. */}
      <div className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex shrink-0 gap-1 rounded-full border border-hairline bg-surface-card p-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => selectFilter(f.key)}
              aria-pressed={filter === f.key}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                filter === f.key
                  ? "bg-arm-consulting text-canvas"
                  : "text-body hover:text-ink"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-body-sm mt-4 text-muted-ink">
        Pick a service — the calendar or quote form below updates to match.
      </p>

      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {servicesInView.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            index={index}
            active={active?.title === service.title}
            onSelect={() => selectService(service.title)}
          />
        ))}
      </div>

      <div ref={panelRef} className="mt-6 scroll-mt-24">
        {active?.category === "educator" ? (
          <BookingWidget calLink={active.bookingUrl} />
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

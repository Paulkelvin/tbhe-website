"use client"

import { useEffect, useState } from "react"
import { preconnect } from "react-dom"
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr"

import { CALENDLY_BOOKING_LINK } from "@/lib/content"

// Embeds Calendly's inline iframe directly rather than waiting on its widget.js to download and build it.
export function BookingWidget({
  calLink = CALENDLY_BOOKING_LINK,
}: {
  calLink?: string
}) {
  preconnect("https://calendly.com")
  preconnect("https://assets.calendly.com")
  const [host, setHost] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setHost(window.location.host)
  }, [])

  useEffect(() => {
    setLoaded(false)
  }, [calLink])

  const src = host
    ? `${calLink}?embed_domain=${host}&embed_type=Inline&primary_color=763d8e&text_color=251827&background_color=ffffff`
    : null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-hairline bg-arm-consulting/5" style={{ height: 700 }}>
      {!loaded ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <CalendarBlank size={28} className="text-arm-consulting/40" />
          <p className="text-sm text-muted-ink">Loading available times…</p>
        </div>
      ) : null}
      {src ? (
        <iframe
          key={src}
          src={src}
          title="Book a time with Cyrkle Brent"
          onLoad={() => setLoaded(true)}
          className="relative h-full w-full"
          style={{ minWidth: 320 }}
        />
      ) : null}
    </div>
  )
}

"use client"

import { useCallback, useEffect, useRef } from "react"
import Script from "next/script"
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr"

import { CALENDLY_BOOKING_LINK } from "@/lib/content"

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement
      }) => void
    }
  }
}

// Real Calendly embed (the client's actual booking link) — matches the
// site's brand color via Calendly's own theming query params rather than
// custom CSS, since the widget renders inside a cross-origin iframe.
export function BookingWidget({
  calLink = CALENDLY_BOOKING_LINK,
}: {
  calLink?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const url = `${calLink}?primary_color=763d8e&text_color=251827&background_color=ffffff`

  const initWidget = useCallback(() => {
    if (containerRef.current && window.Calendly) {
      containerRef.current.innerHTML = ""
      window.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
      })
    }
  }, [url])

  useEffect(() => {
    initWidget()
  }, [initWidget])

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-hairline bg-arm-consulting/5"
      style={{ minHeight: 700 }}
    >
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <CalendarBlank size={28} className="text-arm-consulting/40" />
        <p className="text-sm text-muted-ink">Loading available times…</p>
      </div>
      <div ref={containerRef} style={{ minWidth: 320, height: 700 }} />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={initWidget}
      />
    </div>
  )
}

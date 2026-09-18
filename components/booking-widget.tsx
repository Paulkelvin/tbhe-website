"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr"

import { DISCOVERY_CALL_CAL_LINK } from "@/lib/content"

export function BookingWidget() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi()
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#5b2a73" },
          dark: { "cal-brand": "#5b2a73" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()
  }, [])

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-hairline bg-arm-consulting/5"
      style={{ minHeight: 700 }}
    >
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <CalendarBlank size={28} className="text-arm-consulting/40" />
        <p className="text-sm text-muted-ink">Loading available times…</p>
      </div>
      <Cal
        calLink={DISCOVERY_CALL_CAL_LINK}
        style={{ width: "100%", height: "100%", minHeight: "700px" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  )
}

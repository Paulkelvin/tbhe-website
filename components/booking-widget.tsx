"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr"

import { DISCOVERY_CALL_CAL_LINK } from "@/lib/content"

export function BookingWidget({
  calLink = DISCOVERY_CALL_CAL_LINK,
}: {
  calLink?: string
}) {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi()
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#763d8e" },
          dark: { "cal-brand": "#763d8e" },
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
        key={calLink}
        calLink={calLink}
        style={{ width: "100%", height: "100%", minHeight: "700px" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  )
}

"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"

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
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-card">
      <Cal
        calLink={DISCOVERY_CALL_CAL_LINK}
        style={{ width: "100%", height: "100%", minHeight: "700px" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  )
}

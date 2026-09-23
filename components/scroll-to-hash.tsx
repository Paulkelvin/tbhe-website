"use client"

import { useEffect } from "react"

// Cross-page "action" links point at a specific in-page section via a
// hash (e.g. /ecosystem/consulting#book), so a button like "Explore
// Consulting Services" lands you at the actual booking widget, not just
// the top of the page. A browser's native hash jump on page load is
// instant and happens before the page has visually settled, which reads
// as jarring rather than intentional. This lands at the top like any
// other page load, then glides down to the section on purpose, with the
// same smooth motion used for on-page anchor links elsewhere.
export function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const target = document.getElementById(hash.slice(1))
    if (!target) return

    window.scrollTo({ top: 0, behavior: "instant" })

    const timer = setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return null
}

"use client"

import Link from "next/link"
import type { ComponentProps, MouseEvent } from "react"

// A plain `<Link href="#book">` only scrolls the first time you click it —
// once the URL hash is already "#book", clicking the same link again is a
// no-op in the browser (no hash change, so no scroll). This forces the
// scroll every time, regardless of the current hash.
export function AnchorLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const hash = String(href)

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (hash.startsWith("#")) {
      const id = hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        event.preventDefault()
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        history.replaceState(null, "", hash)
      }
    }
    onClick?.(event)
  }

  return <Link href={href} onClick={handleClick} {...props} />
}

"use client"

import dynamic from "next/dynamic"

// Sanity Studio is a browser-only SPA — loading it via a client-only
// dynamic import keeps sanity.config.ts (and the Studio's own package
// graph) out of the server/RSC compilation entirely, which is required
// for it to build under Next's App Router.
const Studio = dynamic(() => import("./Studio"), { ssr: false })

export default function StudioPage() {
  return <Studio />
}

import type { Metadata } from "next"

import { NotFoundContent } from "@/components/not-found-content"

// Next.js automatically adds a noindex robots tag for 404 responses, so
// this only needs the title (no need to duplicate the robots directive).
export const metadata: Metadata = {
  title: "Page Not Found",
}

export default function NotFound() {
  return <NotFoundContent />
}

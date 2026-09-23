import type { Metadata } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"

import "@/app/(site)/globals.css"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NotFoundContent } from "@/components/not-found-content"
import { getArms, getNavLinks, getSiteSettings } from "@/sanity/queries"

// Next.js only mounts this for URLs that don't match any route at all
// (a mistyped/removed top-level path) — every route inside app/(site)
// has its own layout and its own not-found.tsx for a route-level
// notFound() call. Since there's no shared root layout providing the
// <html>/<body> shell (each route group is its own root, per Next's
// multiple-root-layouts pattern), this file has to provide that shell
// itself, matching app/(site)/layout.tsx exactly, so an entirely
// unmatched URL still renders the same branded header/footer/design
// instead of Next's generic default 404.
const fontSans = Manrope({ subsets: ["latin"], variable: "--font-sans" })
const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Page Not Found",
}

export default async function RootNotFound() {
  const [settings, navLinks, arms] = await Promise.all([
    getSiteSettings(),
    getNavLinks(),
    getArms(),
  ])

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontSans.variable,
        fontDisplay.variable
      )}
    >
      <body className="flex min-h-screen flex-col">
        <SiteHeader siteName={settings.siteName} navLinks={navLinks} arms={arms} />
        <main className="flex-1">
          <NotFoundContent />
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}

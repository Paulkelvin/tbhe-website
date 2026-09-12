"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { List, X } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { NAV_LINKS, SITE } from "@/lib/content"

const EASE = [0.4, 0, 0.2, 1] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-ink">
          {SITE.shortName}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-body md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 after:ease-out hover:text-ink hover:after:scale-x-100 ${active ? "text-ink after:scale-x-100" : ""}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" className="duration-300 hover:-translate-y-0.5">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-9 items-center justify-center rounded-full border border-hairline-strong text-ink transition-colors duration-200 md:hidden"
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="fixed inset-x-0 top-16 bottom-0 z-40 bg-ink/30 md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute inset-x-0 top-full z-50 border-t border-hairline bg-canvas shadow-lg md:hidden"
            >
              <nav className="flex flex-col gap-1 px-6 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2 text-sm text-body transition-colors duration-200 hover:bg-canvas-soft hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-90"
                >
                  Get in Touch
                </Link>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

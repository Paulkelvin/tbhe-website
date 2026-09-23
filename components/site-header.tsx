"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CaretDown, List, X } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Arm } from "@/lib/content"

const EASE = [0.4, 0, 0.2, 1] as const

type SiteHeaderProps = {
  siteName: string
  navLinks: { label: string; href: string }[]
  arms: Pick<Arm, "slug" | "name">[]
}

export function SiteHeader({ siteName, navLinks, arms }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const [ecosystemOpen, setEcosystemOpen] = useState(false)
  const ecosystemRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // The Ecosystem dropdown used to open on CSS :hover/:focus-within, which
  // has no real "leave" event on a touchscreen — tapping it left the panel
  // stuck open over whatever page you navigated to. It's now driven by
  // explicit state instead, so it always has a real way to close: picking
  // an item, navigating away, tapping outside it, or pressing Escape.
  useEffect(() => {
    setEcosystemOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!ecosystemOpen) return

    function handlePointerDown(e: PointerEvent) {
      if (ecosystemRef.current && !ecosystemRef.current.contains(e.target as Node)) {
        setEcosystemOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setEcosystemOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [ecosystemOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/tbhe-logo.png"
            alt={siteName}
            width={972}
            height={631}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-body md:flex">
          {navLinks.map((link) => {
            if (link.href === "/ecosystem") {
              const active = pathname.startsWith("/ecosystem")
              return (
                <div key={link.href} ref={ecosystemRef} className="relative">
                  <div className="flex items-center gap-2">
                    <Link
                      href={link.href}
                      onClick={() => setEcosystemOpen(false)}
                      className={cn(
                        "relative py-1 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 after:ease-out hover:text-ink hover:after:scale-x-100",
                        active && "text-ink after:scale-x-100"
                      )}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setEcosystemOpen((v) => !v)}
                      aria-expanded={ecosystemOpen}
                      aria-label={ecosystemOpen ? "Close Ecosystem menu" : "Open Ecosystem menu"}
                      className="-my-2 -ml-1 -mr-2.5 flex items-center py-2 pr-2.5 pl-1 text-body transition-colors duration-200 hover:text-ink"
                    >
                      <CaretDown
                        size={10}
                        weight="bold"
                        className={cn("transition-transform duration-200", ecosystemOpen && "-rotate-180")}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {ecosystemOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15, ease: EASE }}
                        className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3"
                      >
                        <div className="rounded-xl border border-hairline bg-surface-card p-2 shadow-lg">
                          {arms.map((arm) => (
                            <Link
                              key={arm.slug}
                              href={`/ecosystem/${arm.slug}`}
                              onClick={() => setEcosystemOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm text-body transition-colors duration-200 hover:bg-canvas-soft hover:text-ink"
                            >
                              {arm.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )
            }

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
              className="absolute inset-x-0 top-full z-50 border-t border-hairline bg-surface-card shadow-lg md:hidden"
            >
              <nav className="flex flex-col gap-1 px-6 py-4">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-2 py-2 text-sm text-body transition-colors duration-200 hover:bg-canvas-soft hover:text-ink"
                    >
                      {link.label}
                    </Link>
                    {link.href === "/ecosystem" ? (
                      <div className="ml-3 flex flex-col gap-1 border-l border-hairline pl-3">
                        {arms.map((arm) => (
                          <Link
                            key={arm.slug}
                            href={`/ecosystem/${arm.slug}`}
                            onClick={() => setOpen(false)}
                            className="rounded-md px-2 py-1.5 text-sm text-muted-ink transition-colors duration-200 hover:bg-canvas-soft hover:text-ink"
                          >
                            {arm.name}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
                <Link
                  href="/donate"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm text-body transition-colors duration-200 hover:bg-canvas-soft hover:text-ink"
                >
                  Donate
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold tracking-[0.01em] text-primary-foreground transition-opacity duration-200 hover:opacity-90"
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

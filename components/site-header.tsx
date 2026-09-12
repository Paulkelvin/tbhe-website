"use client"

import { useState } from "react"
import Link from "next/link"
import { List, X } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NAV_LINKS, SITE } from "@/lib/content"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-ink">
          {SITE.shortName}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-body md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-9 items-center justify-center rounded-full border border-hairline-strong text-ink md:hidden"
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-hairline bg-canvas md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-body hover:bg-canvas-soft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  )
}

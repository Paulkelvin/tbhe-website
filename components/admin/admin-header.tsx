"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { List, X } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"

import { logout } from "@/app/admin/actions"
import type { AdminNavGroup } from "@/lib/admin/nav"

const EASE = [0.4, 0, 0.2, 1] as const

export function AdminHeader({ groups }: { groups: AdminNavGroup[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the menu whenever navigation actually happens, so picking a
  // section always collapses it back down to just that section's editor.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas sm:hidden">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
        <Link href="/admin" className="text-h3-alt text-ink">
          TBHE Admin
        </Link>
        <div className="flex items-center gap-4">
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-semibold text-body transition-colors hover:text-primary"
            >
              Sign out
            </button>
          </form>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-full border border-hairline-strong text-ink transition-colors hover:border-primary hover:text-primary"
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="admin-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="fixed inset-x-0 top-16 bottom-0 z-40 bg-ink/30"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.nav
              key="admin-nav-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute inset-x-0 top-full z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-hairline bg-canvas shadow-lg"
              aria-label="Admin sections"
            >
              <div className="px-5 py-5">
                {groups.map((group) => (
                  <div key={group.title} className="mb-6 last:mb-0">
                    <p className="eyebrow text-muted-ink">{group.title}</p>
                    <div className="mt-2 flex flex-col gap-1">
                      {group.items.map((item) => {
                        const active = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                              active
                                ? "bg-canvas-soft text-ink"
                                : "text-body hover:bg-canvas-soft hover:text-ink"
                            }`}
                          >
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

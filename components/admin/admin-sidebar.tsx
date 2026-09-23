"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { logout } from "@/app/admin/actions"
import type { AdminNavGroup } from "@/lib/admin/nav"

// Desktop-only: a persistent dashboard-style sidebar, always visible, no
// menu to open. The hamburger in AdminHeader is for mobile only — on a
// screen this size there's room to just show every section at once.
export function AdminSidebar({ groups }: { groups: AdminNavGroup[] }) {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-hairline bg-canvas px-5 py-6 sm:flex">
      <Link href="/admin" className="text-h3-alt text-ink">
        TBHE Admin
      </Link>
      <nav className="mt-8 flex flex-1 flex-col gap-6 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="eyebrow px-3 text-muted-ink">{group.title}</p>
            <div className="mt-2 flex flex-col gap-1">
              {group.items.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
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
      </nav>
      <form action={logout} className="pt-6">
        <button
          type="submit"
          className="w-full rounded-full border border-hairline-strong px-4 py-2 text-sm font-semibold text-body transition-colors hover:border-primary hover:text-primary"
        >
          Sign out
        </button>
      </form>
    </aside>
  )
}

import Link from "next/link"

import { logout } from "@/app/admin/actions"
import { ADMIN_SECTIONS } from "@/lib/admin/registry"

export default function AdminProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-hairline bg-canvas px-5 py-6 sm:flex">
        <Link href="/admin" className="text-h3-alt text-ink">
          TBHE Admin
        </Link>
        <nav className="mt-8 flex flex-col gap-1">
          {ADMIN_SECTIONS.map((section) => (
            <Link
              key={section.slug}
              href={`/admin/content/${section.slug}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-canvas-soft hover:text-ink"
            >
              {section.title}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-auto pt-6">
          <button
            type="submit"
            className="w-full rounded-full border border-hairline-strong px-4 py-2 text-sm font-semibold text-body transition-colors hover:border-primary hover:text-primary"
          >
            Sign out
          </button>
        </form>
      </aside>

      {/* min-w-0: without it, this flex item's automatic minimum width
          is its content's min-content — the nowrap pill row below would
          then stretch the whole page instead of scrolling within itself. */}
      <div className="min-w-0 flex-1">
        {/* Mobile top bar — the sidebar collapses below sm */}
        <div className="border-b border-hairline bg-canvas sm:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <Link href="/admin" className="text-h3-alt text-ink">
              TBHE Admin
            </Link>
            <form action={logout}>
              <button type="submit" className="text-sm font-semibold text-primary">
                Sign out
              </button>
            </form>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-5 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ADMIN_SECTIONS.map((section) => (
              <Link
                key={section.slug}
                href={`/admin/content/${section.slug}`}
                className="shrink-0 rounded-full border border-hairline-strong px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-body"
              >
                {section.title}
              </Link>
            ))}
          </nav>
        </div>
        <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  )
}

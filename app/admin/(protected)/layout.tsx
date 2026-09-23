import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ADMIN_NAV_GROUPS } from "@/lib/admin/nav"

export default function AdminProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar groups={ADMIN_NAV_GROUPS} />

      {/* min-w-0: without it, this flex item's automatic minimum width
          is its content's min-content — a nowrap row inside children
          could then stretch the whole page instead of scrolling within
          itself. See the identical fix on the booking-services page. */}
      <div className="min-w-0 flex-1">
        <AdminHeader groups={ADMIN_NAV_GROUPS} />
        <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  )
}

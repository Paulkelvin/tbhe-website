import { AdminHeader } from "@/components/admin/admin-header"
import { ADMIN_NAV_GROUPS } from "@/lib/admin/nav"

export default function AdminProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <AdminHeader groups={ADMIN_NAV_GROUPS} />
      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">{children}</main>
    </div>
  )
}

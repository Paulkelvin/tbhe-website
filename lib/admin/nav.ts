import { ADMIN_SECTIONS } from "@/lib/admin/registry"

export type AdminNavItem = { label: string; href: string }
export type AdminNavGroup = { title: string; items: AdminNavItem[] }

// The hamburger menu's contents. Kept separate from ADMIN_SECTIONS (which
// only describes editable content types) so future non-content admin
// features — users, analytics, settings — can add their own group here
// without touching the content-schema registry.
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    title: "Content",
    items: ADMIN_SECTIONS.map((section) => ({
      label: section.title,
      href: `/admin/content/${section.slug}`,
    })),
  },
]

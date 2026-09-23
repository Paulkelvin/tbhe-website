import Link from "next/link"

import { Button } from "@/components/ui/button"
import { OrganicBlob } from "@/components/organic-art"
import { getNavLinks } from "@/sanity/queries"

// Shared body for the 404 experience, used by both app/(site)/not-found.tsx
// (route-level notFound() calls within the (site) tree) and the root
// app/not-found.tsx (genuinely unmatched top-level URLs, which have no
// route group layout to mount) so both paths render the identical design.
export async function NotFoundContent() {
  const NAV_LINKS = await getNavLinks()

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas-soft">
      <OrganicBlob
        color="var(--primary)"
        variant={1}
        filterId="paper-roughen-1"
        rotate={-6}
        className="top-[-20%] left-[-14%] h-[150%] w-[38%] opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center sm:px-8 sm:py-32">
        <p className="eyebrow text-primary">404</p>
        <h1 className="text-h1 mt-4 text-ink">
          This page wandered off the map
        </h1>
        <p className="text-lead mx-auto mt-5 max-w-md text-body">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved. Here&apos;s how to find your way back.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-12 border-t border-hairline pt-8">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-body">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

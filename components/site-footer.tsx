import Image from "next/image"
import Link from "next/link"
import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr"

import { FOOTER_COLUMNS, SITE, SOCIAL_LINKS } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-canvas-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/images/tbhe-logo.png"
            alt={SITE.name}
            width={972}
            height={631}
            className="h-12 w-auto"
          />
          <p className="text-body-sm mt-4 max-w-sm text-body">{SITE.tagline}</p>
          <div className="mt-5 flex items-center gap-3">
            <Link
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="TBHE on Instagram"
              className="flex size-9 items-center justify-center rounded-full border border-hairline-strong text-body transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramLogo size={18} />
            </Link>
            <Link
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="TBHE on LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-hairline-strong text-body transition-colors hover:border-primary hover:text-primary"
            >
              <LinkedinLogo size={18} />
            </Link>
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-4 space-y-2">
              {col.links.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-body hover:text-ink"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-hairline">
        <div className="caption mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-muted-ink sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="whitespace-nowrap text-[clamp(0.5625rem,-0.294rem+4.29vw,0.75rem)]">
              &copy; {new Date().getFullYear()} {SITE.name}. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-ink">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-ink">
                Terms of Service
              </Link>
            </div>
          </div>
          <p>Mission 139 is a 501(c)(3) nonprofit organization.</p>
        </div>
      </div>
    </footer>
  )
}

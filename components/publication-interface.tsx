import Link from "next/link"

import { FEATURED_RESOURCE, RESOURCES } from "@/lib/content"

const secondary = RESOURCES.find(
  (r) => r.title === "Protect Your Peace & Intellectual Property"
)!
const spine = RESOURCES.find(
  (r) => r.title === "Teacher Burnout vs. Systemic Change"
)!

// A decorative but real digital-publishing composition for the Media page —
// built from the site's actual resource data with plain HTML/CSS, not an
// image and not fake software chrome. One dominant surface (the featured
// white paper), one smaller surface layered behind it, and a thin "spine"
// referencing a third real resource peeking from the edge.
export function PublicationInterface() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -top-12 -right-4 w-40 rounded-md border border-hairline bg-surface-card p-4 shadow-[0_20px_45px_-28px_rgba(37,24,39,0.4)] sm:-top-16 sm:-right-9 sm:w-56 sm:p-5">
        <p className="eyebrow text-[9px] text-arm-media-ink sm:text-[10px]">
          {secondary.kind}
        </p>
        <p className="text-h3-alt mt-1.5 text-[0.7rem] leading-snug text-ink sm:mt-2 sm:text-xs">
          {secondary.title}
        </p>
      </div>

      <div
        aria-hidden
        className="absolute -bottom-5 -left-5 hidden h-28 w-8 items-center justify-center rounded-sm bg-primary sm:flex"
      >
        <span
          className="eyebrow text-[10px] text-canvas"
          style={{ writingMode: "vertical-rl" }}
        >
          {spine.kind}
        </span>
      </div>

      <div className="relative rounded-lg border border-hairline bg-surface-card p-7 shadow-[0_35px_70px_-32px_rgba(37,24,39,0.45)] sm:p-10">
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <p className="eyebrow text-muted-ink">
            Resource Center
          </p>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-arm-media" />
        </div>

        <p className="eyebrow mt-6 text-arm-media-ink">
          {FEATURED_RESOURCE.kind}
        </p>
        <h3 className="text-h3 mt-3 text-ink">
          {FEATURED_RESOURCE.title}
        </h3>
        <p className="text-body-sm mt-4 text-body">{FEATURED_RESOURCE.description}</p>

        <Link
          href="/resources"
          className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary"
        >
          <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
            {FEATURED_RESOURCE.cta}
          </span>
          <span className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  )
}

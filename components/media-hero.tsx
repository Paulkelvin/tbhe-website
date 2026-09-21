import { Button } from "@/components/ui/button"
import { AnchorLink } from "@/components/anchor-link"
import type { Arm } from "@/lib/content"

// Page-specific hero for /ecosystem/media only — a masthead-like editorial
// opening built entirely from typography and rule lines (no photograph, no
// gradient blobs), distinct from the other arms' centered treatments.
export function MediaHero({ arm, ctaHref }: { arm: Arm; ctaHref: string }) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-arm-media/[0.045]">
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-24">
        <div className="flex items-center justify-between border-b border-arm-media/25 pb-4">
          <p className="eyebrow text-arm-media-ink">
            {arm.kicker}
          </p>
          <span aria-hidden className="hidden h-px flex-1 bg-arm-media/20 sm:mx-6 sm:block" />
          <p className="eyebrow hidden text-muted-ink sm:block">
            Ideas &middot; Voice &middot; Publication
          </p>
        </div>

        <div className="relative grid gap-10 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pt-14">
          <div className="relative z-10 max-w-xl">
            <h1 className="text-display text-ink">
              Media &amp;
              <br />
              <span className="text-arm-media-ink italic">Publishing</span>
            </h1>
            <p className="text-lead mt-6 max-w-md text-body">
              {arm.summary}
            </p>
            <p className="text-body-sm mt-4 text-muted-ink">For: {arm.audience}</p>
            <div className="mt-8">
              <Button asChild size="lg">
                <AnchorLink href={ctaHref}>{arm.cta}</AnchorLink>
              </Button>
            </div>
          </div>

          {/* An oversized, cropped editorial word — pure typography, no
              image — bleeding from the top-right corner as the page's
              opening visual statement. Design copy, not an attributed
              quote. */}
          <div
            aria-hidden
            className="pointer-events-none relative hidden select-none lg:block"
          >
            <span className="font-display absolute top-[-2.5rem] right-[-1.2rem] text-[9rem] leading-none tracking-tight text-arm-media/[0.14]">
              IDEAS
            </span>
            <p className="text-quote absolute right-0 bottom-2 max-w-[15rem] text-right text-ink/70">
              Ideas should move beyond the room.
            </p>
          </div>
        </div>

        {/* Mobile: a small quiet version of the same statement, no quote
            marks — it's design copy, not an attributed quote. */}
        <p className="text-quote mt-10 max-w-xs text-ink/70 lg:hidden">
          Ideas should move beyond the room.
        </p>
      </div>
    </section>
  )
}

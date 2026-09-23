import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AnchorLink } from "@/components/anchor-link"
import { OrganicBlob } from "@/components/organic-art"
import { ARM_COLOR_CLASS, type Arm } from "@/lib/content"

const WORKSPACE_ALT =
  "A consultant's workspace: a laptop showing 'Stronger Educators. Brighter Futures.' with a People/Practice/Systems diagram, stacked education books, a potted plant, a coffee mug reading 'Education Changes Lives,' glasses, and an open notebook with a workshop next-steps checklist"

// Page-specific hero for /ecosystem/consulting only — an asymmetric
// composition rather than the shared ArmHero's centered layout, so the
// other arm pages are unaffected.
export function ConsultingHero({ arm, ctaHref }: { arm: Arm; ctaHref: string }) {
  const colors = ARM_COLOR_CLASS[arm.color]

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas-soft">
      <OrganicBlob
        color="var(--arm-consulting)"
        variant={1}
        filterId="paper-roughen-torn"
        rotate={-8}
        className="top-[-28%] right-[4%] hidden h-[148%] w-[46%] opacity-[0.09] lg:block"
      />

      <div className="relative mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-24">
        <div className="relative z-10 text-center lg:text-left">
          <span
            className={cn(
              "caption inline-flex rounded-full bg-surface-card px-3 py-1",
              colors.text
            )}
          >
            {arm.kicker}
          </span>
          <h1 className="text-h1 mt-5 text-ink">
            {arm.name}
          </h1>
          <p className="text-lead mx-auto mt-5 max-w-xl text-body lg:mx-0">
            {arm.summary}
          </p>
          <p className="text-body-sm mx-auto mt-3 max-w-xl text-muted-ink lg:mx-0">
            For: {arm.audience}
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Button asChild size="lg">
              <AnchorLink href={ctaHref}>{arm.cta}</AnchorLink>
            </Button>
          </div>
        </div>

        {/* Mobile: a tightly cropped fragment of the workspace, centered
            with room to breathe, not the whole wide scene squeezed down. */}
        <div className="relative mx-auto mt-2 aspect-square w-[62%] sm:w-[50%] lg:hidden">
          <Image
            src="/images/consulting-workspace.png"
            alt={WORKSPACE_ALT}
            fill
            priority
            sizes="60vw"
            className="object-contain"
            style={{ objectPosition: "15% 35%" }}
          />
        </div>
      </div>

      {/* Desktop: the workspace enters from the right, cropped rather than
          shown in full, bleeding past the section edge. */}
      <div className="pointer-events-none absolute top-1/2 right-[-7vw] hidden h-[86%] w-[54vw] -translate-y-1/2 lg:block">
        <Image
          src="/images/consulting-workspace.png"
          alt={WORKSPACE_ALT}
          fill
          priority
          sizes="54vw"
          className="object-contain"
          style={{ objectPosition: "left center" }}
        />
      </div>
    </section>
  )
}

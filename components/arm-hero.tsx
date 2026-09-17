import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DecorativeBlob } from "@/components/decorative-blob"
import { ARM_COLOR_CLASS, type Arm } from "@/lib/content"

export function ArmHero({
  arm,
  ctaHref,
}: {
  arm: Arm
  ctaHref: string
}) {
  const colors = ARM_COLOR_CLASS[arm.color]

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-hairline",
        colors.softBg
      )}
    >
      <DecorativeBlob className={cn("-right-20 -top-20 size-72 opacity-30", colors.bg)} />
      <DecorativeBlob className={cn("-bottom-24 -left-16 size-64 opacity-20", colors.bg)} />

      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
        <span
          className={cn(
            "inline-flex rounded-full bg-surface-card px-3 py-1 text-xs font-semibold tracking-wide",
            colors.text
          )}
        >
          {arm.kicker}
        </span>
        <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {arm.name}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
          {arm.summary}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-ink">
          For: {arm.audience}
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href={ctaHref}>{arm.cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

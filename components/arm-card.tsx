import Link from "next/link"
import {
  ArrowUpRight,
  GraduationCap,
  HeartStraight,
  Microphone,
} from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { DecorativeBlob } from "@/components/decorative-blob"
import { ARM_COLOR_CLASS, type Arm } from "@/lib/content"

const ARM_ICON: Record<Arm["color"], typeof GraduationCap> = {
  consulting: GraduationCap,
  mission: HeartStraight,
  media: Microphone,
}

export function ArmCard({ arm, index }: { arm: Arm; index?: number }) {
  const colors = ARM_COLOR_CLASS[arm.color]
  const Icon = ARM_ICON[arm.color]
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null

  return (
    <Link
      href={`/ecosystem/${arm.slug}`}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-surface-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-hairline-strong hover:shadow-[0_16px_40px_-16px_rgba(37,24,39,0.18)] sm:p-8"
    >
      <DecorativeBlob
        className={cn("-top-10 -left-10 size-32 opacity-70", colors.softBg)}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-full",
              colors.softBg,
              colors.text
            )}
          >
            <Icon size={20} weight="duotone" />
          </div>
          {number ? (
            <span className="font-display text-sm text-muted-ink/70">{number}</span>
          ) : null}
        </div>

        <span
          className={cn(
            "caption mt-5 inline-flex rounded-full px-3 py-1",
            colors.softBg,
            colors.text
          )}
        >
          {arm.kicker}
        </span>

        <h3 className="text-h3 mt-4 text-ink">{arm.name}</h3>
        <p className="text-body-sm mt-3 text-body">{arm.summary}</p>
      </div>

      <div
        className={cn(
          "relative mt-8 inline-flex items-center gap-1 text-sm font-medium",
          colors.text
        )}
      >
        {arm.cta}
        <ArrowUpRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  )
}

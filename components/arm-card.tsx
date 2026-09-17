import Link from "next/link"
import {
  ArrowUpRight,
  GraduationCap,
  HeartStraight,
  Microphone,
} from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
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
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-surface-card p-6 pt-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-hairline-strong hover:shadow-[0_16px_40px_-16px_rgba(37,24,39,0.18)] sm:p-8 sm:pt-9"
    >
      <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1", colors.bg)} />
      {number ? (
        <span
          aria-hidden
          className={cn(
            "font-display pointer-events-none absolute -top-3 right-2 text-8xl leading-none font-semibold opacity-[0.07]",
            colors.text
          )}
        >
          {number}
        </span>
      ) : null}

      <div>
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full",
            colors.softBg,
            colors.text
          )}
        >
          <Icon size={24} weight="duotone" />
        </div>

        <span
          className={cn(
            "mt-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
            colors.softBg,
            colors.text
          )}
        >
          {arm.kicker}
        </span>

        <h3 className="font-display mt-4 text-xl font-semibold text-ink">{arm.name}</h3>
        <p className="mt-3 text-sm text-body">{arm.summary}</p>
      </div>

      <div
        className={cn(
          "mt-8 inline-flex items-center gap-1 text-sm font-medium",
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

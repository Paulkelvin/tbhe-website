import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { ARM_COLOR_CLASS, type Arm } from "@/lib/content"

export function ArmCard({ arm }: { arm: Arm }) {
  const colors = ARM_COLOR_CLASS[arm.color]

  return (
    <Link
      href={`/ecosystem/${arm.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-hairline bg-surface-card p-8 transition-colors hover:border-hairline-strong"
    >
      <div>
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
            colors.softBg,
            colors.text
          )}
        >
          {arm.kicker}
        </span>

        <h3 className="mt-5 text-xl font-semibold text-ink">{arm.name}</h3>
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

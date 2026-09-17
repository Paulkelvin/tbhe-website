"use client"

import { motion, useReducedMotion, type Variants } from "motion/react"
import type { IconProps } from "@phosphor-icons/react"
import {
  BookOpenText,
  CalendarBlank,
  FileText,
  Gift,
  HandCoins,
  HandHeart,
  Handshake,
  Microphone,
  Plant,
  PuzzlePiece,
  Scales,
} from "@phosphor-icons/react/dist/ssr"

const EASE = [0.4, 0, 0.2, 1] as const

const ICONS: Record<string, React.ComponentType<IconProps>> = {
  HandHeart,
  Plant,
  PuzzlePiece,
  Handshake,
  HandCoins,
  Scales,
  BookOpenText,
  Gift,
  FileText,
  Microphone,
  CalendarBlank,
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export function FeatureList({
  items,
}: {
  items: readonly { icon?: string; title: string; description: string }[]
}) {
  const reduced = useReducedMotion()

  const card = (entry: { icon?: string; title: string; description: string }) => {
    const Icon = entry.icon ? ICONS[entry.icon] : undefined
    return (
      <div className="rounded-2xl border border-hairline bg-surface-card p-6 transition-shadow duration-300 hover:shadow-[0_16px_40px_-20px_rgba(37,24,39,0.2)]">
        {Icon ? (
          <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon size={20} weight="duotone" />
          </div>
        ) : null}
        <h3 className="text-base font-semibold text-ink">{entry.title}</h3>
        <p className="mt-2 text-sm text-body">{entry.description}</p>
      </div>
    )
  }

  if (reduced) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((entry) => (
          <div key={entry.title}>{card(entry)}</div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {items.map((entry) => (
        <motion.div key={entry.title} variants={item}>
          {card(entry)}
        </motion.div>
      ))}
    </motion.div>
  )
}

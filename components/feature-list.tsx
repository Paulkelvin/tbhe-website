"use client"

import { motion, useReducedMotion, type Variants } from "motion/react"

const EASE = [0.4, 0, 0.2, 1] as const

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
  items: readonly { title: string; description: string }[]
}) {
  const reduced = useReducedMotion()

  const card = (entry: { title: string; description: string }) => (
    <div className="rounded-2xl border border-hairline bg-surface-card p-6 transition-shadow duration-300 hover:shadow-[0_16px_40px_-20px_rgba(37,24,39,0.2)]">
      <h3 className="text-base font-semibold text-ink">{entry.title}</h3>
      <p className="mt-2 text-sm text-body">{entry.description}</p>
    </div>
  )

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

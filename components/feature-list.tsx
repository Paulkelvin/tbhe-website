"use client"

import Image from "next/image"
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

import { ARM_COLOR_CLASS, type Arm } from "@/lib/content"

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
  show: { transition: { staggerChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

type Entry = { icon?: string; title: string; description: string }

function IconBadge({
  icon,
  size,
  textClass,
  bgClass,
}: {
  icon?: string
  size: number
  textClass: string
  bgClass: string
}) {
  const Icon = icon ? ICONS[icon] : undefined
  if (!Icon) return null
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full ${bgClass} ${textClass}`}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.5)} weight="duotone" />
    </div>
  )
}

export function FeatureList({
  items,
  accent = "consulting",
  anchorImage,
  anchorImageAlt,
}: {
  items: readonly Entry[]
  accent?: Arm["color"]
  anchorImage?: string
  anchorImageAlt?: string
}) {
  const reduced = useReducedMotion()
  const colors = ARM_COLOR_CLASS[accent]
  const [anchor, ...rest] = items

  const anchorTile = (
    <div className={`flex h-full flex-col overflow-hidden rounded-2xl ${colors.softBg}`}>
      {anchorImage ? (
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={anchorImage}
            alt={anchorImageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
        </div>
      ) : null}
      <div
        className={`flex flex-1 flex-col p-8 ${anchorImage ? "" : "justify-center"}`}
      >
        {!anchorImage ? (
          <IconBadge icon={anchor.icon} size={48} textClass={colors.text} bgClass="bg-surface-card" />
        ) : null}
        <h3 className={anchorImage ? "text-xl font-semibold text-ink" : "mt-5 text-xl font-semibold text-ink"}>
          {anchor.title}
        </h3>
        <p className="mt-3 text-sm text-body">{anchor.description}</p>
      </div>
    </div>
  )

  const rowList = (
    <div className="divide-y divide-hairline md:self-center">
      {rest.map((entry) => (
        <div key={entry.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
          <IconBadge icon={entry.icon} size={40} textClass={colors.text} bgClass={colors.softBg} />
          <div>
            <h3 className="text-base font-semibold text-ink">{entry.title}</h3>
            <p className="mt-1 text-sm text-body">{entry.description}</p>
          </div>
        </div>
      ))}
    </div>
  )

  if (reduced) {
    return (
      <div className="grid gap-8 md:grid-cols-12 md:items-stretch">
        <div className="md:col-span-7">{anchorTile}</div>
        <div className="md:col-span-5">{rowList}</div>
      </div>
    )
  }

  return (
    <motion.div
      className="grid gap-8 md:grid-cols-12 md:items-stretch"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div variants={item} className="md:col-span-7">
        {anchorTile}
      </motion.div>
      <motion.div variants={item} className="md:col-span-5">
        {rowList}
      </motion.div>
    </motion.div>
  )
}

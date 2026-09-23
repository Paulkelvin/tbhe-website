import type { PortableTextBlock } from "@/sanity/queries"

export function formatPostDate(iso?: string): string | null {
  if (!iso) return null
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

// Average adult silent reading speed, rounded up so a short post still
// reads as "1 min read" rather than "0 min read".
const WORDS_PER_MINUTE = 225

export function estimateReadingMinutes(body?: PortableTextBlock[]): number | null {
  if (!body?.length) return null
  const wordCount = body.reduce((count, block) => {
    if (block._type !== "block" || !Array.isArray(block.children)) return count
    const text = block.children.map((span) => span.text ?? "").join(" ")
    return count + text.split(/\s+/).filter(Boolean).length
  }, 0)
  if (wordCount === 0) return null
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
}

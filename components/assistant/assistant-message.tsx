"use client"

import Link from "next/link"
import { Fragment } from "react"

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g

function inline(text: string) {
  return text.split(INLINE).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      )
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      if (href.startsWith("/")) {
        return (
          <Link
            key={index}
            href={href}
            className="font-semibold text-primary underline underline-offset-2 hover:text-primary-active"
          >
            {label}
          </Link>
        )
      }
      if (href.startsWith("http")) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-primary underline underline-offset-2 hover:text-primary-active"
          >
            {label}
          </a>
        )
      }
    }

    return <Fragment key={index}>{part}</Fragment>
  })
}

/**
 * Small, safe markdown renderer for model output: paragraphs, bullet and
 * numbered lists, bold, and links. No raw HTML, no headings or tables.
 */
export function AssistantText({ text }: { text: string }) {
  const lines = text.split("\n")
  const blocks: React.ReactNode[] = []
  let paragraph: string[] = []
  let list: string[] = []
  let ordered = false

  function flushParagraph() {
    if (!paragraph.length) return
    blocks.push(<p key={`p-${blocks.length}`}>{inline(paragraph.join(" "))}</p>)
    paragraph = []
  }

  function flushList() {
    if (!list.length) return
    const items = list.map((item, index) => (
      <li key={index} className="pl-0.5">
        {inline(item)}
      </li>
    ))
    blocks.push(
      ordered ? (
        <ol
          key={`l-${blocks.length}`}
          className="ml-4 list-decimal space-y-1.5"
        >
          {items}
        </ol>
      ) : (
        <ul key={`l-${blocks.length}`} className="ml-4 list-disc space-y-1.5">
          {items}
        </ul>
      )
    )
    list = []
  }

  for (const line of lines) {
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/)
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/)

    if (bullet || numbered) {
      flushParagraph()
      const nextOrdered = Boolean(numbered)
      if (list.length && ordered !== nextOrdered) flushList()
      ordered = nextOrdered
      list.push((bullet?.[1] ?? numbered?.[1] ?? "").trim())
      continue
    }

    if (!line.trim()) {
      flushParagraph()
      flushList()
      continue
    }

    flushList()
    paragraph.push(line.trim())
  }

  flushParagraph()
  flushList()

  return <div className="space-y-2.5">{blocks}</div>
}

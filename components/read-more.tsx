"use client"

import { useState } from "react"

// Shows the first item always, and reveals the rest behind a toggle instead
// of dumping every paragraph on the visitor at once.
export function ReadMore({ children }: { children: React.ReactNode[] }) {
  const [expanded, setExpanded] = useState(false)
  const [first, ...rest] = children

  return (
    <>
      {first}
      {expanded ? rest : null}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="group mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary"
      >
        <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
          {expanded ? "Show less" : "Read more"}
        </span>
        <span aria-hidden>{expanded ? "↑" : "→"}</span>
      </button>
    </>
  )
}

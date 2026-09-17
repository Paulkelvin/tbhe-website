import { cn } from "@/lib/utils"

// Shared SVG filter definitions for the homepage's hand-rendered art
// direction layer. Rendered once; other decorative SVGs reference these
// filters by id regardless of where they sit on the page.
export function ArtDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <filter id="paper-roughen-1" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
        </filter>
        <filter id="paper-roughen-2" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
        </filter>
        <filter id="paper-roughen-torn" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" seed="9" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="24" />
        </filter>
        <filter id="sketch-wobble" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" />
        </filter>
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"
          />
        </filter>
      </defs>
    </svg>
  )
}

const BLOB_PATHS = [
  "M50,8 C72,6 90,24 90,48 C90,73 69,92 45,90 C22,88 6,68 8,44 C10,21 29,10 50,8 Z",
  "M22,38 C17,18 38,4 60,8 C82,12 93,34 88,57 C83,80 59,93 37,86 C15,79 5,60 9,45 C11,42 15,40 22,38 Z",
]

// An irregular, paper-torn-edge shape (not a perfect CSS blob) — the
// feDisplacementMap filter roughens the path's outline so it reads as a
// cut/painted form rather than a mathematically smooth circle.
export function OrganicBlob({
  className,
  color,
  variant = 0,
  filterId = "paper-roughen-1",
  rotate = 0,
}: {
  className?: string
  color: string
  variant?: 0 | 1
  filterId?: "paper-roughen-1" | "paper-roughen-2" | "paper-roughen-torn"
  rotate?: number
}) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      viewBox="0 0 100 100"
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      <path d={BLOB_PATHS[variant]} fill={color} filter={`url(#${filterId})`} />
    </svg>
  )
}

// A single hand-drawn-feeling stroke — a slightly wobbled line/underline/
// connector, never a perfectly smooth vector curve.
export function HandDrawnStroke({
  className,
  color = "currentColor",
  d,
  strokeWidth = 1.6,
  viewBox = "0 0 100 100",
}: {
  className?: string
  color?: string
  d: string
  strokeWidth?: number
  viewBox?: string
}) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      viewBox={viewBox}
      fill="none"
    >
      <path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        filter="url(#sketch-wobble)"
      />
    </svg>
  )
}

// An abstract sheet-of-paper/letter form — a rectangle with a roughened,
// slightly deckled edge, sitting at a small rotation as if placed rather
// than perfectly aligned. Used for the newsletter's correspondence motif.
export function PaperSheet({
  className,
  color,
  rotate = -4,
  filterId = "paper-roughen-2",
}: {
  className?: string
  color: string
  rotate?: number
  filterId?: "paper-roughen-1" | "paper-roughen-2"
}) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      viewBox="0 0 100 130"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <rect x="6" y="6" width="88" height="118" rx="2" fill={color} filter={`url(#${filterId})`} />
    </svg>
  )
}

// A near-invisible tactile paper grain, meant for one or two compositions
// only (per the "quiet vs. expressive" rhythm), not the whole page.
export function PaperGrain({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}

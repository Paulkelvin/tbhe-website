import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
  decoration,
  compact,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
  decoration?: React.ReactNode
  // Shorter vertical padding for pages where the hero shouldn't push
  // the page's real content (e.g. a form) below the fold on mobile.
  compact?: boolean
}) {
  return (
    <section className={cn("relative border-b border-hairline bg-surface-card", className)}>
      {decoration}
      <div
        className={cn(
          "relative mx-auto max-w-4xl px-6 text-center sm:px-8",
          compact ? "py-10 sm:py-16" : "py-20"
        )}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="text-h1 mt-4 text-ink">
          {title}
        </h1>
        {description ? (
          <p className="text-lead mx-auto mt-5 max-w-2xl text-body">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  )
}

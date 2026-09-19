import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
  decoration,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
  decoration?: React.ReactNode
}) {
  return (
    <section className={cn("relative border-b border-hairline bg-canvas-soft", className)}>
      {decoration}
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
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

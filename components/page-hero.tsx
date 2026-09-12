import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <section className={cn("border-b border-hairline bg-canvas-soft", className)}>
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  )
}

import Link from "next/link"

import { Button } from "@/components/ui/button"

export function CtaBanner({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow: string
  title: string
  description: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <section className="border-t border-hairline bg-ink">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center sm:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-canvas/60 uppercase">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-canvas sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-base text-canvas/75">{description}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          {secondary ? (
            <Button asChild size="lg" variant="outline" className="border-canvas/30 bg-transparent text-canvas hover:bg-canvas/10 hover:text-canvas">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}

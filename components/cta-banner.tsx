import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { DecorativeBlob } from "@/components/decorative-blob"

export function CtaBanner({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  decoration,
}: {
  eyebrow: string
  title: string
  description: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
  decoration?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-t border-hairline bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <DecorativeBlob className="-left-20 top-1/2 size-72 -translate-y-1/2 bg-arm-media/25" />
      <DecorativeBlob className="-right-20 -bottom-20 size-64 bg-arm-consulting/30" />
      {decoration}

      <Reveal className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center sm:px-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-canvas/60 uppercase">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-canvas sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-base text-canvas/75">{description}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="duration-300 hover:-translate-y-0.5">
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          {secondary ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-canvas/30 bg-transparent text-canvas duration-300 hover:-translate-y-0.5 hover:bg-canvas/10 hover:text-canvas"
            >
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </Reveal>
    </section>
  )
}

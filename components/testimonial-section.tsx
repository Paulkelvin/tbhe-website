import { Quotes } from "@phosphor-icons/react/dist/ssr"

import { PaperGrain } from "@/components/organic-art"
import { Reveal } from "@/components/reveal"

// TODO: replace with a real testimonial, case study, or endorsement — a
// school leader, parent/family outcome, or partner quote all work well.
// The dashed border and muted tone are intentional so this can't be
// mistaken for finished content if it ships before real copy is dropped
// in; the paper-clipping treatment (slight rotation, grain, soft shadow)
// is the actual visual design and should carry over once real text lands.
export function TestimonialSection() {
  return (
    <section className="section">
      <Reveal
        className="relative mx-auto max-w-2xl -rotate-1 overflow-hidden rounded-sm border border-dashed border-hairline-strong bg-surface-card p-10 text-center shadow-[0_18px_40px_-26px_rgba(37,24,39,0.3)]"
      >
        <PaperGrain className="opacity-40 mix-blend-multiply" />
        <div className="relative">
          <Quotes size={36} weight="fill" className="mx-auto text-muted-soft" />
          <p className="text-quote mt-4 text-muted-ink">
            &quot;[Placeholder — add a real quote here. A specific outcome
            from a school leader, parent, or partner will land stronger than
            a general compliment.]&quot;
          </p>
          <p className="eyebrow mt-4 text-muted-soft">
            TODO — Name, Title / Role
          </p>
        </div>
      </Reveal>
    </section>
  )
}

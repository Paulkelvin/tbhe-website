import { Quotes } from "@phosphor-icons/react/dist/ssr"

import { Reveal } from "@/components/reveal"

// TODO: replace with a real testimonial, case study, or endorsement — a
// school leader, parent/family outcome, or partner quote all work well.
// This placeholder is intentionally styled (dashed border, muted tone) so
// it can't be mistaken for finished content if it ships before real copy
// is dropped in.
export function TestimonialSection() {
  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl rounded-2xl border border-dashed border-hairline-strong bg-canvas-soft p-10 text-center">
        <Quotes size={36} weight="fill" className="mx-auto text-muted-soft" />
        <p className="font-display mt-4 text-xl text-muted-ink italic">
          &quot;[Placeholder — add a real quote here. A specific outcome from
          a school leader, parent, or partner will land stronger than a
          general compliment.]&quot;
        </p>
        <p className="eyebrow mt-4 text-muted-soft">
          TODO — Name, Title / Role
        </p>
      </Reveal>
    </section>
  )
}

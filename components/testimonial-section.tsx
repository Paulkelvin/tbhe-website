import { Quotes } from "@phosphor-icons/react/dist/ssr"

import { PaperGrain } from "@/components/organic-art"
import { Reveal } from "@/components/reveal"

// A real endorsement, given the paper-clipping treatment (slight rotation,
// grain, soft shadow) established for this slot.
export function TestimonialSection() {
  return (
    <section className="section">
      <Reveal
        className="relative mx-auto max-w-2xl -rotate-1 overflow-hidden rounded-sm border border-hairline bg-surface-card p-10 text-center shadow-[0_18px_40px_-26px_rgba(37,24,39,0.3)]"
      >
        <PaperGrain className="opacity-40 mix-blend-multiply" />
        <div className="relative">
          <Quotes size={36} weight="fill" className="mx-auto text-primary/25" />
          <p className="text-quote mt-4 text-ink">
            &quot;TBHE helped us move beyond simply identifying the
            challenges in our school. We left with a clearer strategy,
            stronger alignment across our leadership team, and practical
            steps we could actually put into action.&quot;
          </p>
          <p className="label mt-4 text-muted-ink">
            Dr. Maya Richardson, School Principal
          </p>
        </div>
      </Reveal>
    </section>
  )
}

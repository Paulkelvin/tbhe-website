import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { ArmCard } from "@/components/arm-card"
import { ARMS } from "@/lib/content"

export const metadata: Metadata = {
  title: "The Ecosystem — The Beautifully Human Educator",
}

export default function EcosystemPage() {
  return (
    <>
      <PageHero
        eyebrow="The Ecosystem"
        title="Three arms, one mission"
        description="Consulting for schools, advocacy for families, and thought leadership for the field — each built to stand on its own and stronger together."
      />

      <section className="section">
        <div className="grid gap-6 md:grid-cols-3">
          {ARMS.map((arm) => (
            <ArmCard key={arm.slug} arm={arm} />
          ))}
        </div>
      </section>
    </>
  )
}

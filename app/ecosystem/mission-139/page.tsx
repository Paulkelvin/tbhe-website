import type { Metadata } from "next"

import { ArmHero } from "@/components/arm-hero"
import { SectionHeading } from "@/components/section-heading"
import { FeatureList } from "@/components/feature-list"
import { CtaBanner } from "@/components/cta-banner"
import { ARMS, MISSION_139_PROGRAMS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Mission 139 — The Beautifully Human Educator",
}

const arm = ARMS.find((a) => a.slug === "mission-139")!

export default function Mission139Page() {
  return (
    <>
      <ArmHero arm={arm} ctaHref="/contact" />

      <section className="section">
        <div className="rounded-2xl border border-arm-mission/30 bg-arm-mission/5 p-8">
          <p className="eyebrow text-arm-mission">Psalm 139:14</p>
          <p className="mt-3 max-w-2xl text-base text-body">
            &quot;I praise you because I am fearfully and wonderfully
            made.&quot; Mission 139 is built on the belief that every
            neurodivergent child deserves to be met with that same regard —
            in their IEP meeting, in their classroom, and at home.
          </p>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Programs"
          title="Advocacy and aid, side by side"
          description="Financial support and representation so families never have to choose between the two."
        />
        <div className="mt-10">
          <FeatureList items={MISSION_139_PROGRAMS} />
        </div>
      </section>

      <CtaBanner
        eyebrow="Get Support"
        title="Apply for family assistance or start an advocacy request"
        description="Serving families across the DMV region with IEP/504 representation, evaluation and therapy grants, and district advocacy."
        primary={{ label: "Apply for Family Aid", href: "/contact" }}
        secondary={{ label: "Donate", href: "/contact" }}
      />
    </>
  )
}

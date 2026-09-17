import type { Metadata } from "next"

import { Quotes } from "@phosphor-icons/react/dist/ssr"

import { ArmHero } from "@/components/arm-hero"
import { SectionHeading } from "@/components/section-heading"
import { FeatureList } from "@/components/feature-list"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"
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
        <Reveal className="mx-auto max-w-3xl text-center">
          <Quotes
            size={56}
            weight="fill"
            className="mx-auto text-arm-mission/25"
          />
          <p className="mt-2 text-2xl font-medium text-ink italic sm:text-3xl">
            &quot;I praise you because I am fearfully and wonderfully
            made.&quot;
          </p>
          <p className="eyebrow mt-4 text-arm-mission">Psalm 139:14</p>
          <p className="mx-auto mt-5 max-w-xl text-base text-body">
            Mission 139 is built on the belief that every neurodivergent
            child deserves to be met with that same regard — in their IEP
            meeting, in their classroom, and at home.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Programs"
            title="Advocacy and aid, side by side"
            description="Financial support and representation so families never have to choose between the two."
          />
        </Reveal>
        <div className="mt-10">
          <FeatureList items={MISSION_139_PROGRAMS} accent={arm.color} />
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

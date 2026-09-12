import type { Metadata } from "next"

import { ArmHero } from "@/components/arm-hero"
import { SectionHeading } from "@/components/section-heading"
import { FeatureList } from "@/components/feature-list"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"
import { ARMS, CONSULTING_MODULES } from "@/lib/content"

export const metadata: Metadata = {
  title: "Educational Consulting & Coaching — The Beautifully Human Educator",
}

const arm = ARMS.find((a) => a.slug === "consulting")!

export default function ConsultingPage() {
  return (
    <>
      <ArmHero arm={arm} ctaHref="/contact" />

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Professional Development"
            title="Modules built for real schools"
            description="Workshops, coaching cohorts, and curriculum support designed around DEI, retention, inclusion, and emotional intelligence in coaching."
          />
        </Reveal>
        <div className="mt-10">
          <FeatureList items={CONSULTING_MODULES} />
        </div>
      </section>

      <section className="section">
        <Reveal className="rounded-2xl border border-hairline bg-surface-card p-10">
          <SectionHeading
            eyebrow="Booking"
            title="Request a discovery call"
          />
          <p className="mt-4 max-w-2xl text-sm text-body">
            School leaders can request a discovery call to scope a custom
            professional development proposal, coaching cohort, or staff
            workshop. Reach out through the contact form and specify
            &quot;Consulting &amp; professional development&quot; — a
            scheduling link will follow.
          </p>
        </Reveal>
      </section>

      <CtaBanner
        eyebrow="Partner With Us"
        title="Ready to bring this to your school or district?"
        description="Book a consultation and we'll build a proposal around your staff's actual needs."
        primary={{ label: "Book a Consultation", href: "/contact" }}
      />
    </>
  )
}

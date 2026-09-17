import type { Metadata } from "next"

import { ArmHero } from "@/components/arm-hero"
import { SectionHeading } from "@/components/section-heading"
import { FeatureList } from "@/components/feature-list"
import { BookingWidget } from "@/components/booking-widget"
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
      <ArmHero arm={arm} ctaHref="#book" />

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Professional Development"
            title="Modules built for real schools"
            description="Workshops, coaching cohorts, and curriculum support designed around DEI, retention, inclusion, and emotional intelligence in coaching."
          />
        </Reveal>
        <div className="mt-10">
          <FeatureList
            items={CONSULTING_MODULES}
            accent={arm.color}
            anchorImage="/images/consulting-anchor.jpg"
            anchorImageAlt="A group of educators in a professional development workshop discussion"
          />
        </div>
      </section>

      <section id="book" className="section scroll-mt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Booking"
            title="Request a discovery call"
            description="Pick a time that works for you — we'll use the call to scope a custom professional development proposal, coaching cohort, or staff workshop."
          />
        </Reveal>
        <div className="mt-10">
          <BookingWidget />
        </div>
      </section>

      <CtaBanner
        eyebrow="Partner With Us"
        title="Ready to bring this to your school or district?"
        description="Book a consultation and we'll build a proposal around your staff's actual needs."
        primary={{ label: "Book a Consultation", href: "#book" }}
      />
    </>
  )
}

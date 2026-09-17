import type { Metadata } from "next"

import { ArmHero } from "@/components/arm-hero"
import { SectionHeading } from "@/components/section-heading"
import { FeatureList } from "@/components/feature-list"
import { SpeakerBookingForm } from "@/components/speaker-booking-form"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"
import { ARMS, MEDIA_OFFERINGS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Media & Publishing — The Beautifully Human Educator",
}

const arm = ARMS.find((a) => a.slug === "media")!

export default function MediaPage() {
  return (
    <>
      <ArmHero arm={arm} ctaHref="#book" />

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Speaking Topics"
            title="Keynotes that don't play it safe"
            description={'Including "Diversity as Divine Design" and "Teacher Burnout vs. Systemic Change" — built for conferences, districts, and educator communities.'}
          />
        </Reveal>
        <div className="mt-10">
          <FeatureList
            items={MEDIA_OFFERINGS}
            accent={arm.color}
            anchorImage="/images/media-anchor.jpg"
            anchorImageAlt="A researcher writing a white paper at a desk"
          />
        </div>
      </section>

      <section id="book" className="section scroll-mt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Booking"
            title="Request a speaker booking"
            description="Share a few details about your event and we'll follow up with availability."
          />
        </Reveal>
        <div className="mt-10 max-w-2xl">
          <SpeakerBookingForm />
        </div>
      </section>

      <CtaBanner
        eyebrow="Book or Read"
        title="Bring this work to your conference, or your inbox"
        description="Download the latest research or start a speaker booking request."
        primary={{ label: "Download White Paper", href: "/resources" }}
        secondary={{ label: "Book a Speaker", href: "#book" }}
      />
    </>
  )
}

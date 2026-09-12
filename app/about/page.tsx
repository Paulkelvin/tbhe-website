import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "About — The Beautifully Human Educator",
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A founder's path across K-8, high school, and advocacy"
        description="The Beautifully Human Educator exists because one educator's classroom experience turned into a mission for every classroom."
      />

      <section className="section grid gap-16 md:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Founder Story" title="From the classroom to the ecosystem" />
          <p className="mt-5 text-base text-body">
            Years spent teaching across K-8 and high school revealed the same
            pattern again and again: early-career teachers burning out,
            neurodivergent students falling through the cracks of
            under-resourced systems, and a wider field starved for honest
            thought leadership. TBHE was built to respond to all three, at
            once, without pretending they're separate problems.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Mission" title="Fearfully and wonderfully made" />
          <p className="mt-5 text-base text-body">
            Mission 139 takes its name from Psalm 139:14 — a reminder that
            every learner, including every neurodivergent child, is made with
            intention. That belief anchors the consulting practice, the
            nonprofit, and the public speaking under one roof: educators
            deserve support, and so do the families they serve.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading eyebrow="Advisory Board" title="Guided by people who know the work" />
          <p className="mt-5 max-w-2xl text-base text-body">
            TBHE is advised by educators, special education advocates, and
            nonprofit leaders committed to keeping every arm of this ecosystem
            accountable to the families and schools it serves.
          </p>
        </Reveal>
      </section>

      <CtaBanner
        eyebrow="Learn More"
        title="See the full ecosystem in action"
        description="Explore consulting, Mission 139, and the media arm to find where you fit in."
        primary={{ label: "View the Ecosystem", href: "/ecosystem" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  )
}

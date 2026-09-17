import Image from "next/image"

import { Hero } from "@/components/hero"
import { EcosystemOverview } from "@/components/ecosystem-overview"
import { TestimonialSection } from "@/components/testimonial-section"
import { FeaturedResource } from "@/components/featured-resource"
import { ThreeWayCta } from "@/components/three-way-cta"
import { StatGrid } from "@/components/stat-grid"
import { SectionHeading } from "@/components/section-heading"
import { NewsletterForm } from "@/components/newsletter-form"
import { Reveal } from "@/components/reveal"
import { PaperSheet } from "@/components/organic-art"
import { IMPACT_STATS, SCHOOL_PARTNERS } from "@/lib/content"

export default function HomePage() {
  return (
    <>
      <Hero />

      <EcosystemOverview />

      <section className="section">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <SectionHeading
            eyebrow="Our Impact"
            title="The numbers behind the mission"
            description="A snapshot of what TBHE has delivered across consulting, advocacy, and community programming so far."
          />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-10">
            <StatGrid stats={IMPACT_STATS} />
          </div>
          <div className="mt-12 flex flex-col items-center gap-8">
            <span className="eyebrow">School Partners</span>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {SCHOOL_PARTNERS.map((partner) => (
                <Image
                  key={partner.name}
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-9 w-auto transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <TestimonialSection />

      <FeaturedResource />

      <section className="relative overflow-hidden bg-gradient-to-br from-arm-consulting/10 via-canvas-soft to-arm-media/10 py-14 sm:py-20 lg:py-(--section-padding)">
        <PaperSheet
          color="var(--arm-consulting)"
          rotate={-8}
          className="-top-10 -right-10 h-56 w-44 opacity-[0.07] sm:h-72 sm:w-56"
        />
        <PaperSheet
          color="var(--arm-media)"
          rotate={6}
          className="-bottom-14 -left-8 h-48 w-36 opacity-[0.08] sm:h-64 sm:w-48"
        />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            <SectionHeading
              eyebrow="Stay Connected"
              title="The Beautifully Human Educator Newsletter"
              description="Research, resources, and updates from all three arms — straight to your inbox."
            />
            <NewsletterForm />
          </Reveal>
        </div>
      </section>

      <ThreeWayCta />
    </>
  )
}

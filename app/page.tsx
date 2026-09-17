import Image from "next/image"

import { Hero } from "@/components/hero"
import { EcosystemOverview } from "@/components/ecosystem-overview"
import { FeaturedResource } from "@/components/featured-resource"
import { StatGrid } from "@/components/stat-grid"
import { SectionHeading } from "@/components/section-heading"
import { CtaBanner } from "@/components/cta-banner"
import { NewsletterForm } from "@/components/newsletter-form"
import { Reveal } from "@/components/reveal"
import { DecorativeBlob } from "@/components/decorative-blob"
import { IMPACT_STATS, SCHOOL_PARTNERS } from "@/lib/content"

export default function HomePage() {
  return (
    <>
      <Hero />

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
          <div className="mt-16 flex flex-col items-center gap-8">
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

      <EcosystemOverview />

      <FeaturedResource />

      <section className="relative overflow-hidden bg-gradient-to-br from-arm-consulting/10 via-canvas-soft to-arm-media/10 py-14 sm:py-20 lg:py-(--section-padding)">
        <DecorativeBlob className="-right-16 -top-16 size-64 bg-arm-consulting/15" />
        <DecorativeBlob className="-bottom-16 -left-16 size-64 bg-arm-media/15" />
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

      <CtaBanner
        eyebrow="Get Involved"
        title="Where does your story fit into this ecosystem?"
        description="Whether you lead a school, need advocacy for your family, or want to book a speaker — there's a place for you here."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "View Events", href: "/events" }}
      />
    </>
  )
}

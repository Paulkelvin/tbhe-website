import Link from "next/link"

import { Hero } from "@/components/hero"
import { ArmCard } from "@/components/arm-card"
import { StatGrid } from "@/components/stat-grid"
import { SectionHeading } from "@/components/section-heading"
import { CtaBanner } from "@/components/cta-banner"
import { NewsletterForm } from "@/components/newsletter-form"
import { Badge } from "@/components/ui/badge"
import {
  ARMS,
  FEATURED_RESOURCE,
  IMPACT_STATS,
  SCHOOL_PARTNERS,
} from "@/lib/content"

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section">
        <StatGrid stats={IMPACT_STATS} />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-ink">
          <span className="eyebrow">School Partners</span>
          {SCHOOL_PARTNERS.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="One Founder, Three Arms"
          title="The TBHE Ecosystem"
          description="Educational consulting, special education advocacy, and thought leadership — three distinct paths built on one mission."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ARMS.map((arm) => (
            <ArmCard key={arm.slug} arm={arm} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="rounded-2xl border border-hairline bg-surface-card p-10">
          <Badge className="w-fit">{FEATURED_RESOURCE.kind}</Badge>
          <h3 className="mt-5 text-2xl font-semibold text-ink">
            {FEATURED_RESOURCE.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-body">
            {FEATURED_RESOURCE.description}
          </p>
          <Link
            href="/resources"
            className="mt-5 inline-block text-sm font-medium text-primary hover:underline"
          >
            {FEATURED_RESOURCE.cta} &rarr;
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-hairline bg-canvas-soft p-10 text-center">
          <SectionHeading
            eyebrow="Stay Connected"
            title="The Beautifully Human Educator Newsletter"
            description="Research, resources, and updates from all three arms — straight to your inbox."
          />
          <NewsletterForm />
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

import Link from "next/link"
import Image from "next/image"

import { Hero } from "@/components/hero"
import { ArmCard } from "@/components/arm-card"
import { StatGrid } from "@/components/stat-grid"
import { SectionHeading } from "@/components/section-heading"
import { CtaBanner } from "@/components/cta-banner"
import { NewsletterForm } from "@/components/newsletter-form"
import { Reveal } from "@/components/reveal"
import { DecorativeBlob } from "@/components/decorative-blob"
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
        <Reveal>
          <StatGrid stats={IMPACT_STATS} />
          <div className="mt-8 flex flex-col items-center gap-8">
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

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="One Founder, Three Arms"
            title="The TBHE Ecosystem"
            description="Educational consulting, special education advocacy, and thought leadership — three distinct paths built on one mission."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ARMS.map((arm, index) => (
            <Reveal key={arm.slug} delay={index * 0.1} className="h-full">
              <ArmCard arm={arm} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal className="grid gap-8 rounded-2xl border border-hairline bg-surface-card p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Badge className="w-fit">{FEATURED_RESOURCE.kind}</Badge>
            <h3 className="mt-5 text-2xl font-semibold text-ink">
              {FEATURED_RESOURCE.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-body">
              {FEATURED_RESOURCE.description}
            </p>
            <Link
              href="/resources"
              className="mt-5 inline-block text-sm font-medium text-primary transition-colors hover:underline"
            >
              {FEATURED_RESOURCE.cta} &rarr;
            </Link>
          </div>

          <div className="relative mx-auto h-48 w-36 shrink-0 sm:h-56 sm:w-40">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-arm-consulting/10" />
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl bg-arm-consulting/20" />
            <div className="absolute inset-0 overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/chess-knight.png"
                alt="A carved wooden chess knight in dramatic light, symbolizing strategic thinking"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

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

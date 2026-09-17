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
          <p className="eyebrow text-center">Our Impact</p>
          <div className="mt-6">
            <StatGrid stats={IMPACT_STATS} />
          </div>
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
        <Reveal>
          <p className="eyebrow">Featured Resource</p>
        </Reveal>
        <Reveal
          delay={0.05}
          className="relative mt-6 overflow-hidden rounded-2xl border border-hairline bg-surface-card md:min-h-[340px]"
        >
          {/* Mobile: full-width image band above the text, sharp edge. */}
          <div className="relative h-56 w-full md:hidden">
            <Image
              src="/images/chess-knight.png"
              alt="A carved wooden chess knight in dramatic light, symbolizing strategic thinking"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 flex flex-col gap-1 p-8 sm:p-10 md:max-w-[52%] md:justify-center md:py-10">
            <Badge className="w-fit">{FEATURED_RESOURCE.kind}</Badge>
            <h3 className="font-display mt-4 text-2xl font-semibold text-ink">
              {FEATURED_RESOURCE.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-body">
              {FEATURED_RESOURCE.description}
            </p>
            <Link
              href="/resources"
              className="mt-5 inline-block w-fit text-sm font-medium text-primary transition-colors hover:underline"
            >
              {FEATURED_RESOURCE.cta} &rarr;
            </Link>
          </div>

          {/* Desktop: full-height image bleeding in from the right. A mask fades the image's
              own pixels to transparent (rather than an overlay tint), so it dissolves cleanly
              into the card's white background near the middle instead of looking muddy. */}
          <div
            className="absolute inset-y-0 right-0 hidden w-[50%] md:block"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 38%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 38%)",
            }}
          >
            <Image
              src="/images/chess-knight.png"
              alt="A carved wooden chess knight in dramatic light, symbolizing strategic thinking"
              fill
              sizes="50vw"
              className="object-cover"
              style={{ objectPosition: "70% center" }}
            />
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

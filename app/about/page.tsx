import type { Metadata } from "next"
import Image from "next/image"
import { Quotes } from "@phosphor-icons/react/dist/ssr"

import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"
import { ArtDefs, OrganicBlob } from "@/components/organic-art"

export const metadata: Metadata = {
  title: "About — The Beautifully Human Educator",
}

const COLLAGE_ALT =
  "A curated arrangement of education books (Special Education, Inclusive Classrooms, Education Leadership), an open notebook reading 'Educate, Advocate, Empower, Include, Change Lives,' a coffee mug reading 'A More Inclusive Tomorrow, Together,' handwritten notes, and a photo of books and plants — objects from the founder's classroom-to-ecosystem journey"

export default function AboutPage() {
  return (
    <>
      <ArtDefs />

      <PageHero
        eyebrow="About"
        title="A founder's path across K-8, high school, and advocacy"
        description="The Beautifully Human Educator exists because one educator's classroom experience turned into a mission for every classroom."
      />

      {/* Founder Story — an asymmetric composition where the collage bleeds
          past the normal content width rather than sitting in a framed
          image block. */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal className="relative z-10 lg:max-w-md">
            <SectionHeading eyebrow="Founder Story" title="From the classroom to the ecosystem" />
            <p className="mt-5 text-base text-body">
              Years spent teaching across K-8 and high school revealed the
              same pattern again and again: early-career teachers burning
              out, neurodivergent students falling through the cracks of
              under-resourced systems, and a wider field starved for honest
              thought leadership. TBHE was built to respond to all three, at
              once, without pretending they&apos;re separate problems.
            </p>
          </Reveal>

          {/* Mobile/tablet: the collage sits below the text, bleeding past
              the page's own right gutter rather than being boxed in. */}
          <div className="relative mt-10 -mr-6 h-[300px] w-[calc(100%+1.5rem)] sm:-mr-8 sm:h-[380px] sm:w-[calc(100%+2rem)] lg:hidden">
            <Image
              src="/images/about-collage.png"
              alt={COLLAGE_ALT}
              fill
              sizes="100vw"
              className="object-contain object-left"
            />
          </div>
        </div>

        {/* Desktop: the collage occupies the space beside the text and
            bleeds past the container — and past the viewport edge — rather
            than resolving into a tidy rectangle. */}
        <div className="pointer-events-none absolute top-1/2 right-[-5vw] hidden h-[92%] w-[60vw] -translate-y-1/2 lg:block">
          <Image
            src="/images/about-collage.png"
            alt={COLLAGE_ALT}
            fill
            sizes="60vw"
            className="object-contain object-right"
          />
        </div>
      </section>

      {/* Mission — deliberately quiet: no photography, just sage tone,
          one restrained organic form, and the Psalm 139:14 quotation. */}
      <section className="section relative overflow-hidden bg-arm-mission/5">
        <OrganicBlob
          color="var(--arm-mission)"
          variant={0}
          filterId="paper-roughen-2"
          rotate={8}
          className="top-[-18%] right-[4%] h-[70%] w-[34%] opacity-[0.12]"
        />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="Mission" title="Fearfully and wonderfully made" />
          <p className="mx-auto mt-5 max-w-xl text-base text-body">
            Mission 139 takes its name from Psalm 139:14 — a reminder that
            every learner, including every neurodivergent child, is made
            with intention. That belief anchors the consulting practice, the
            nonprofit, and the public speaking under one roof: educators
            deserve support, and so do the families they serve.
          </p>
          <Quotes size={32} weight="fill" className="mx-auto mt-8 text-arm-mission/30" />
          <p className="font-display mt-2 text-xl text-ink italic">
            &quot;I praise you because I am fearfully and wonderfully
            made.&quot;
          </p>
          <p className="eyebrow mt-3 text-arm-mission-ink">Psalm 139:14</p>
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

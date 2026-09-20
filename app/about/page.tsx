import type { Metadata } from "next"
import Image from "next/image"
import { Quotes } from "@phosphor-icons/react/dist/ssr"

import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"
import { ArtDefs, HandDrawnStroke, OrganicBlob } from "@/components/organic-art"
import { SITE } from "@/lib/content"

export const metadata: Metadata = {
  title: "About — The Beautifully Human Educator",
}

const COLLAGE_ALT = `A curated arrangement of education books (Special Education, Inclusive Classrooms, Education Leadership), an open notebook reading 'Educate, Advocate, Empower, Include, Change Lives,' a coffee mug reading 'A More Inclusive Tomorrow, Together,' handwritten notes, and a photo of books and plants — objects from ${SITE.founderName}'s classroom-to-ecosystem journey`

export default function AboutPage() {
  return (
    <>
      <ArtDefs />

      <PageHero
        className="overflow-hidden"
        eyebrow="About"
        title="A founder's path across K-8, high school, and advocacy"
        description="The Beautifully Human Educator exists because one educator's classroom experience turned into a mission for every classroom."
        decoration={
          <OrganicBlob
            color="var(--primary)"
            variant={1}
            filterId="paper-roughen-1"
            rotate={-6}
            className="top-[-20%] left-[-14%] h-[150%] w-[38%] opacity-[0.07]"
          />
        }
      />

      {/* Founder Story — the collage sits close beside the text as one
          composition, not a disconnected second half of the page. */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal className="relative z-10 lg:max-w-md">
            <SectionHeading eyebrow="Founder Story" title="From the classroom to the ecosystem" />
            <p className="mt-5 text-base text-body">
              {SITE.founderName}&apos;s years teaching across K-8 and high
              school revealed the same pattern again and again: early-career
              teachers burning out, neurodivergent students falling through
              the cracks of under-resourced systems, and a wider field
              starved for honest thought leadership. TBHE was built to
              respond to all three, at once, without pretending
              they&apos;re separate problems.
            </p>
          </Reveal>

          {/* Mobile/tablet: centered beneath the text with comfortable
              cream margin on both sides — not stretched, not boxed. */}
          <div className="relative mx-auto mt-10 h-[280px] w-[85%] sm:h-[340px] sm:w-[75%] lg:hidden">
            <Image
              src="/images/about-collage.png"
              alt={COLLAGE_ALT}
              fill
              sizes="85vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* A fine, hand-drawn line loosely tying the text to the collage —
            not an arrow, just a sense that they belong to one composition. */}
        <HandDrawnStroke
          className="pointer-events-none absolute top-[54%] left-[35%] hidden h-16 w-[14%] lg:block"
          d="M2,8 C22,0 42,30 66,12 C80,3 90,16 98,26"
          color="var(--primary)"
          strokeWidth={1.3}
          viewBox="0 0 100 40"
        />

        {/* Desktop: smaller and pulled inward from the previous pass, so it
            reads as arranged near the text rather than filling a separate
            right half. */}
        <div className="pointer-events-none absolute top-1/2 right-[5vw] hidden h-[74%] w-[42vw] -translate-y-1/2 lg:block">
          <Image
            src="/images/about-collage.png"
            alt={COLLAGE_ALT}
            fill
            sizes="42vw"
            className="object-contain"
            style={{ objectPosition: "30% 50%" }}
          />
        </div>
      </section>

      {/* Mission — deliberately quiet: no photography, just sage tone,
          one restrained organic form, and the Psalm 139:14 quotation. */}
      <section className="section relative overflow-hidden bg-arm-mission/5">
        <OrganicBlob
          color="var(--arm-mission)"
          variant={1}
          filterId="paper-roughen-torn"
          rotate={-10}
          className="top-[-22%] right-[2%] h-[68%] w-[36%] opacity-[0.09]"
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
          <p className="text-quote mt-2 text-ink">
            &quot;I praise you because I am fearfully and wonderfully
            made.&quot;
          </p>
          <div className="relative mt-3 inline-block">
            <p className="eyebrow text-arm-mission-ink">Psalm 139:14</p>
            <HandDrawnStroke
              className="pointer-events-none absolute -bottom-1.5 left-0 h-2 w-full"
              d="M2,4 C20,1 45,7 70,3 C82,1 92,5 98,2"
              color="var(--arm-media)"
              strokeWidth={1.2}
              viewBox="0 0 100 8"
            />
          </div>
        </Reveal>
      </section>

      {/* A Personal Note — a longer, personal endorsement rather than a
          short client pull-quote, so it gets its own quiet card treatment
          instead of the homepage testimonial's paper-clip styling. */}
      <section className="section relative overflow-hidden">
        <Reveal className="relative mx-auto max-w-2xl rounded-2xl border border-hairline bg-surface-card p-8 shadow-[0_18px_40px_-26px_rgba(37,24,39,0.15)] sm:p-12">
          <p className="eyebrow text-center text-primary">A Personal Note</p>
          <div className="mt-6 space-y-4 text-base text-body">
            <p>
              {SITE.name} is the standard of excellence when it comes to
              educational leadership, professional development, and
              supporting the diverse needs of students, families, and school
              communities. {SITE.founderName} brings a rare combination of
              expertise, authenticity, compassion, and vision that
              immediately sets her apart.
            </p>
            <p>
              Whether you are a teacher seeking growth, a school leader
              striving to strengthen your culture, an organization looking
              to create meaningful impact, or a parent advocating for the
              best outcomes for your child, you can expect a transformative
              experience. {SITE.founderName}&apos;s ability to connect
              people, develop leaders, and champion students — especially
              those with unique learning needs — is truly exceptional.
            </p>
            <p>
              What makes {SITE.name} special is that the work never loses
              sight of the people it serves. Every strategy, conversation,
              and partnership is rooted in the belief that students,
              families, and educators deserve to be seen, valued, and
              empowered to succeed.
            </p>
            <p>
              I wholeheartedly recommend {SITE.name} to schools, districts,
              educational organizations, community leaders, and anyone
              committed to creating better outcomes for children. If you are
              looking for a trusted partner who delivers both excellence and
              impact, this is the organization to choose. The difference
              being made in the lives of students, parents, educators, and
              leaders is both meaningful and lasting.
            </p>
          </div>
          <p className="label mt-6 text-center text-muted-ink">
            — Her husband
          </p>
        </Reveal>
      </section>

      {/* Advisory Board — an editorial margin-note layout (label at left,
          copy at right of a top rule) so the page doesn't repeat the same
          centered/left-aligned rhythm a third time. */}
      <section className="section">
        <Reveal className="mx-auto max-w-4xl">
          <div className="relative border-t border-hairline-strong pt-10">
            <HandDrawnStroke
              className="pointer-events-none absolute -top-1 left-0 h-3 w-16"
              d="M2,5 C15,1 30,8 45,3"
              color="var(--primary)"
              strokeWidth={1.4}
              viewBox="0 0 48 10"
            />
            <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
              <p className="eyebrow">Advisory Board</p>
              <div>
                <h2 className="text-h2 text-ink">
                  Guided by people who know the work
                </h2>
                <p className="text-lead mt-4 max-w-xl text-body">
                  TBHE is advised by educators, special education advocates,
                  and nonprofit leaders committed to keeping every arm of
                  this ecosystem accountable to the families and schools it
                  serves.
                </p>
              </div>
            </div>
          </div>
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

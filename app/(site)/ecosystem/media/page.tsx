import Image from "next/image"
import Link from "next/link"

import { MediaHero } from "@/components/media-hero"
import { SectionHeading } from "@/components/section-heading"
import { PublicationInterface } from "@/components/publication-interface"
import { SpeakerBookingForm } from "@/components/speaker-booking-form"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"
import { breadcrumbSchema, pageMetadata } from "@/lib/seo"
import { getArms } from "@/sanity/queries"

export const metadata = pageMetadata({
  title: "Media & Publishing",
  description:
    "Research, white papers, and keynote speaking on equity, educator burnout, and neurodivergent student support from The Beautifully Human Educator.",
  path: "/ecosystem/media",
  image: "/images/media-keynote.jpg",
})

const KEYNOTE_PHOTO_ALT =
  "A speaker in a cream suit addresses a conference audience from the stage, gesturing mid-sentence with a microphone in hand"

export default async function MediaPage() {
  const arms = await getArms()
  const arm = arms.find((a) => a.slug === "media")!
  const MEDIA_OFFERINGS = arm.features ?? []

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "The Ecosystem", path: "/ecosystem" },
    { name: "Media & Publishing", path: "/ecosystem/media" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <MediaHero arm={arm} ctaHref="#book" />

      {/* Keynotes — a full-bleed stage photograph breaking the standard
          content grid, with the speaking programme read as editorial
          hierarchy below rather than three generic feature rows. */}
      <section className="relative">
        <div className="relative h-[58vh] w-full overflow-hidden sm:h-[66vh]">
          <Image
            src="/images/media-keynote.jpg"
            alt={KEYNOTE_PHOTO_ALT}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "62% 25%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 from-0% via-ink/80 via-55% to-transparent to-95%" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-6xl px-6 pb-10 sm:px-8 sm:pb-14">
              <p className="eyebrow text-arm-media">
                Speaking &amp; Events
              </p>
              <h2 className="text-h1 mt-3 max-w-2xl text-canvas">
                Keynotes that don&apos;t play it safe
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-arm-media-ink">01. Speaker Bureau</p>
              <p className="text-body-sm mt-4 max-w-xl text-body">
                {MEDIA_OFFERINGS[1].description}
              </p>
              <p className="text-lead mt-8 max-w-xl border-t border-hairline pt-6 text-body">
                No fixed topic list. Tell us about your event below and
                we&apos;ll tailor the session to your audience.
              </p>
            </Reveal>

            <Reveal delay={0.05} className="lg:border-l lg:border-hairline lg:pl-16">
              <p className="eyebrow text-muted-ink">02. Disrupt &amp; Connect</p>
              <p className="text-body-sm mt-4 text-body">
                {MEDIA_OFFERINGS[2].description}
              </p>
              <div className="mt-6 border-t border-hairline pt-6">
                <p className="eyebrow text-arm-media-ink">Coming Soon</p>
                <p className="text-body-sm mt-2 text-body">
                  TBHE is rebranding, and new events, learning opportunities,
                  and community experiences are on the way. Check back for
                  updates.
                </p>
              </div>
              <Link
                href="/events"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
                  See the Events page
                </span>
                <span className="transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Research & Commentary — the digital publishing composition is
          the section's whole reason for being; text stays quiet beside it. */}
      <section className="relative overflow-hidden bg-arm-media/[0.04] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Research & White Papers"
                title="A growing body of published work"
                description={MEDIA_OFFERINGS[0].description}
              />
            </Reveal>
            <Reveal delay={0.05} className="lg:pl-6">
              <PublicationInterface />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Booking — a quiet, typographic frame around the (unmodified)
          booking form rather than a form floating alone in whitespace. */}
      <section id="book" className="section relative scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <p className="eyebrow text-arm-media-ink">Booking</p>
            <h2 className="text-h2 mt-3 text-ink">
              Request a speaker booking
            </h2>
            <p className="text-lead mt-4 max-w-sm text-body">
              Share a few details about your event and we&apos;ll follow up
              with availability.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <SpeakerBookingForm />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        eyebrow="Book or Read"
        title="Bring this work to your conference, or your inbox"
        description="Download the latest white paper or start a speaker booking request."
        primary={{ label: "Download White Paper", href: "/resources" }}
        secondary={{ label: "Book a Speaker", href: "#book" }}
      />
    </>
  )
}

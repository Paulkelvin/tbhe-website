import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { MediaHero } from "@/components/media-hero"
import { SectionHeading } from "@/components/section-heading"
import { PublicationInterface } from "@/components/publication-interface"
import { SpeakerBookingForm } from "@/components/speaker-booking-form"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"
import { ARMS, EVENTS, KEYNOTE_TOPICS, MEDIA_OFFERINGS } from "@/lib/content"

export const metadata: Metadata = {
  title: "Media & Publishing — The Beautifully Human Educator",
}

const arm = ARMS.find((a) => a.slug === "media")!
const speakingTopics = KEYNOTE_TOPICS.filter(
  (topic) => topic !== "Something else / custom topic"
)
const mixerEvent = EVENTS.find(
  (e) => e.title === "Disrupt & Connect: Fall Networking Mixer"
)!

const KEYNOTE_PHOTO_ALT =
  "A speaker in a cream suit addresses a conference audience from the stage, gesturing mid-sentence with a microphone in hand"

export default function MediaPage() {
  return (
    <>
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
              <p className="text-xs font-semibold tracking-[0.2em] text-arm-media uppercase">
                Speaking &amp; Events
              </p>
              <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-canvas sm:text-5xl">
                Keynotes that don&apos;t play it safe
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-arm-media-ink">01 &mdash; Speaker Bureau</p>
              <p className="mt-4 max-w-xl text-base text-body">
                {MEDIA_OFFERINGS[1].description}
              </p>
              <div className="mt-8 divide-y divide-hairline border-t border-hairline">
                {speakingTopics.map((topic, index) => (
                  <div key={topic} className="flex items-baseline gap-4 py-5">
                    <span className="font-display text-sm text-muted-ink">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                      {topic}
                    </h3>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05} className="lg:border-l lg:border-hairline lg:pl-16">
              <p className="eyebrow text-muted-ink">02 &mdash; Disrupt &amp; Connect</p>
              <p className="mt-4 text-sm text-body">
                {MEDIA_OFFERINGS[2].description}
              </p>
              <div className="mt-6 border-t border-hairline pt-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-arm-media-ink uppercase">
                  {mixerEvent.type}
                </p>
                <h3 className="font-display mt-2 text-lg font-semibold text-ink">
                  {mixerEvent.title}
                </h3>
                <p className="mt-2 text-sm text-body">{mixerEvent.description}</p>
              </div>
              <Link
                href="/events"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
                  See upcoming events
                </span>
                <span className="transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Research & White Papers — the digital publishing composition is
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
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Request a speaker booking
            </h2>
            <p className="mt-4 max-w-sm text-base text-body">
              Share a few details about your event and we&apos;ll follow up
              with availability.
            </p>
            <div className="mt-8 flex flex-col gap-2 border-t border-hairline pt-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-ink uppercase">
                Available Topics
              </p>
              {speakingTopics.map((topic) => (
                <p key={topic} className="font-display text-base text-ink">
                  {topic}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <SpeakerBookingForm />
          </Reveal>
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

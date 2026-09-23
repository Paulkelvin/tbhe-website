import Image from "next/image"

import { ConsultingHero } from "@/components/consulting-hero"
import { SectionHeading } from "@/components/section-heading"
import { BookingServices } from "@/components/booking-services"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"
import { ArtDefs, HandDrawnStroke } from "@/components/organic-art"
import { breadcrumbSchema, pageMetadata } from "@/lib/seo"
import { getArms, getBookableServices } from "@/sanity/queries"

export const metadata = pageMetadata({
  title: "Educational Consulting & Coaching",
  description:
    "Professional development, instructional coaching, and leadership mentorship for school administrators, district leaders, and early-career educators.",
  path: "/ecosystem/consulting",
  image: "/images/consulting-workspace.png",
})

const BOOKING_PROCESS_STEPS = [
  {
    title: "Listen",
    description: "A conversation about what's actually happening in your classrooms and buildings.",
  },
  {
    title: "Assess",
    description: "We look at your goals, staff needs, and current professional development landscape.",
  },
  {
    title: "Build",
    description: "A proposal (workshops, a coaching cohort, or curriculum support) built around your team.",
  },
  {
    title: "Support",
    description: "Ongoing coaching and check-ins so the work sticks after the training ends.",
  },
]

export default async function ConsultingPage() {
  const [arms, services] = await Promise.all([getArms(), getBookableServices()])
  const arm = arms.find((a) => a.slug === "consulting")!
  const [, ...secondaryModules] = arm.features ?? []

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "The Ecosystem", path: "/ecosystem" },
    { name: "Educational Consulting & Coaching", path: "/ecosystem/consulting" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <ArtDefs />

      <ConsultingHero arm={arm} ctaHref="#book" />

      {/* Modules — the classroom photo stays the primary, unobstructed
          photograph; the three offerings read as an editorial list rather
          than boxed rows. */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Professional Development"
              title="Modules built for real schools"
              description="Workshops, coaching cohorts, and curriculum support designed around DEI, retention, inclusion, and emotional intelligence in coaching."
            />
          </Reveal>

          <div className="relative mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Reveal delay={0.05} className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/consulting-anchor.jpg"
                  alt="A group of educators in a professional development workshop discussion"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              {/* A single sticky note from the workshop materials overlaps
                  the photo's outer edge — restrained, not a repeat of the
                  full asset. */}
              <div className="pointer-events-none absolute -right-5 -bottom-7 hidden h-24 w-32 sm:block">
                <Image
                  src="/images/consulting-workshop-materials.png"
                  alt=""
                  fill
                  sizes="130px"
                  className="object-cover"
                  style={{ objectPosition: "16% 80%" }}
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-8 lg:pt-2">
              {secondaryModules.map((mod) => (
                <div key={mod.title}>
                  <h3 className="text-h3 text-ink">
                    {mod.title}
                  </h3>
                  <HandDrawnStroke
                    className="mt-1.5 h-2 w-12"
                    d="M2,4 C12,1 24,6 38,3"
                    color="var(--arm-consulting)"
                    strokeWidth={1.6}
                    viewBox="0 0 40 8"
                  />
                  <p className="text-body-sm mt-3 text-body">{mod.description}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Booking — an asymmetric sidebar gives the process context before
          the scheduling embed, so the section feels designed rather than a
          heading dropped above a blank rectangle. */}
      <section id="book" className="section relative overflow-hidden scroll-mt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:items-start">
          {/* Booking options come first on mobile: the process steps are
              helpful context, but the actual services/calendar are what
              someone landing here via "Book a Consultation" needs to see
              without scrolling past an explainer first. */}
          {/* min-w-0 keeps this grid item from stretching to fit the
              filter pills' unwrapped width (they scroll internally
              instead) — without it, the whole column silently overflows
              past the mobile viewport and the section's overflow-hidden
              clips it, cropping every card and image on the right edge. */}
          <Reveal delay={0.05} className="order-1 min-w-0 lg:order-2">
            <BookingServices services={services} />
          </Reveal>
          <Reveal className="order-2 min-w-0 lg:order-1">
            <SectionHeading
              eyebrow="Booking"
              title="Choose how we start"
              description="A free discovery call and 1:1 executive coaching book directly on the calendar. School and district engagements start with a quote."
            />
            <div className="mt-10 flex flex-col">
              {BOOKING_PROCESS_STEPS.map((step, index, arr) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-arm-consulting/30 text-xs font-semibold text-arm-consulting">
                      {index + 1}
                    </span>
                    {index < arr.length - 1 ? (
                      <span aria-hidden className="my-1 w-px flex-1 bg-arm-consulting/20" />
                    ) : null}
                  </div>
                  <div className={index < arr.length - 1 ? "pb-6" : ""}>
                    <h3 className="text-h3-alt text-ink">
                      {step.title}
                    </h3>
                    <p className="text-body-sm mt-1 text-body">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        eyebrow="Partner With Us"
        title="Ready to bring this to your school or district?"
        description="Book a consultation and we'll build a proposal around your staff's actual needs."
        primary={{ label: "Book a Consultation", href: "#book" }}
        decoration={
          <>
            <HandDrawnStroke
              className="pointer-events-none absolute top-[20%] left-[8%] hidden h-10 w-28 opacity-[0.14] lg:block"
              d="M2,10 C20,2 40,16 58,8 C72,3 84,12 98,6"
              color="var(--arm-media)"
              strokeWidth={1.4}
              viewBox="0 0 100 20"
            />
            <HandDrawnStroke
              className="pointer-events-none absolute right-[10%] bottom-[24%] hidden h-8 w-24 opacity-[0.12] lg:block"
              d="M2,6 C16,12 30,1 44,7 C56,12 68,3 80,8"
              color="var(--arm-media)"
              strokeWidth={1.4}
              viewBox="0 0 82 14"
            />
          </>
        }
      />
    </>
  )
}

import Image from "next/image"

import { Quotes } from "@phosphor-icons/react/dist/ssr"

import { MissionHero } from "@/components/mission-hero"
import { SectionHeading } from "@/components/section-heading"
import { CtaBanner } from "@/components/cta-banner"
import { DonateForm } from "@/components/donate-form"
import { Reveal } from "@/components/reveal"
import { ArtDefs, HandDrawnStroke } from "@/components/organic-art"
import { ScrollToHash } from "@/components/scroll-to-hash"
import { SITE_URL } from "@/lib/content"
import { breadcrumbSchema as buildBreadcrumbSchema, pageMetadata } from "@/lib/seo"
import { getArms, getSiteSettings } from "@/sanity/queries"

export const metadata = pageMetadata({
  title: "Mission 139",
  description:
    "Mission 139 is a 501(c)(3) nonprofit providing special-education advocacy, IEP/504 support, and financial aid for neurodivergent students and families.",
  path: "/ecosystem/mission-139",
  image: "/images/mission-support-path.png",
})

const BELONG_ARTWORK_ALT =
  "A child's crayon drawing titled 'I belong here,' showing a family holding hands beside a school under a smiling sun, with the words Seen, Supported, Included, and Empowered along the bottom"

const FAMILY_ALT =
  "A mother helping her two children with schoolwork at a table, with hand-lettered notes nearby reading 'Every Child Belongs' and 'Support, Understand, Include, Empower'"

const PATH_FULL_ALT =
  "A hand-drawn vine tracing a path through four waypoints (Heard, Understood, Supported, Empowered), ending at an open door beneath a heart"

export default async function Mission139Page() {
  const [arms, settings] = await Promise.all([getArms(), getSiteSettings()])
  const arm = arms.find((a) => a.slug === "mission-139")!
  const programs = arm.features ?? []

  const nonprofitSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Mission 139",
    description: arm.summary,
    url: `${SITE_URL}/ecosystem/mission-139`,
    email: settings.email,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.addressLine1,
      addressLocality: settings.addressCity,
      addressRegion: settings.addressState,
      postalCode: settings.addressZip,
      addressCountry: "US",
    },
    parentOrganization: { "@type": "Organization", name: settings.siteName, url: SITE_URL },
  }

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "The Ecosystem", path: "/ecosystem" },
    { name: "Mission 139", path: "/ecosystem/mission-139" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nonprofitSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <ScrollToHash />
      <ArtDefs />

      <MissionHero arm={arm} ctaHref="/contact" />

      {/* Psalm 139 — the page's signature moment. The child's artwork bleeds
          in from the left, asymmetric against a generous field of verse and
          negative space, rather than a predictable two-column split. */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <Reveal className="relative hidden lg:block">
              <div className="relative -ml-14 aspect-[16/11] w-[118%] -rotate-3">
                <Image
                  src="/images/mission-belong-artwork.png"
                  alt={BELONG_ARTWORK_ALT}
                  fill
                  sizes="50vw"
                  className="object-contain"
                />
              </div>
            </Reveal>

            <Reveal delay={0.05} className="relative z-10 text-center lg:text-left">
              <Quotes
                size={48}
                weight="fill"
                className="mx-auto text-arm-mission/25 lg:mx-0"
              />
              <p className="text-quote mt-2 text-ink">
                &quot;I praise you because I am fearfully and wonderfully
                made.&quot;
              </p>
              <p className="eyebrow mt-4 text-arm-mission-ink">Psalm 139:14</p>
              <p className="text-lead mx-auto mt-5 max-w-xl text-body lg:mx-0">
                Mission 139 is built on the belief that every neurodivergent
                child deserves to be met with that same regard, in their
                IEP meeting, in their classroom, and at home.
              </p>
            </Reveal>
          </div>

          {/* Mobile: the artwork follows the verse, large enough to read as
              a real artifact, offset rather than centered in a card. */}
          <Reveal delay={0.1} className="mt-12 lg:hidden">
            <div className="relative mx-auto aspect-[16/11] w-[86%] rotate-2">
              <Image
                src="/images/mission-belong-artwork.png"
                alt={BELONG_ARTWORK_ALT}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>

        {/* A sliver of the Support Path travels between the artwork and the
            verse, mostly hidden behind both. */}
        <div className="pointer-events-none absolute top-[62%] left-[30%] hidden h-16 w-[26vw] -translate-y-1/2 opacity-[0.22] lg:block">
          <Image
            src="/images/mission-support-path.png"
            alt=""
            fill
            sizes="26vw"
            className="object-cover"
            style={{ objectPosition: "38% 45%" }}
          />
        </div>
      </section>

      {/* Advocacy & aid — the family photograph anchors the section; the
          four programs read as an editorial list rather than icon rows. */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Programs"
              title="Advocacy and aid, side by side"
              description="Financial support and representation so families never have to choose between the two."
            />
          </Reveal>

          <div className="relative mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal delay={0.05} className="relative">
              <div className="relative mx-auto aspect-[3/2] w-full max-w-xl -rotate-1 lg:max-w-none">
                <Image
                  src="/images/mission-family.png"
                  alt={FAMILY_ALT}
                  fill
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-contain"
                />
                <div className="pointer-events-none absolute -bottom-8 -left-6 hidden h-16 w-28 opacity-[0.28] lg:block">
                  <Image
                    src="/images/mission-support-path.png"
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                    style={{ objectPosition: "66% 40%" }}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-8">
              {programs.map((program) => (
                <div key={program.title}>
                  <h3 className="text-h3 text-ink">
                    {program.title}
                  </h3>
                  <HandDrawnStroke
                    className="mt-1.5 h-2 w-12"
                    d="M2,4 C12,1 24,6 38,3"
                    color="var(--arm-mission)"
                    strokeWidth={1.6}
                    viewBox="0 0 40 8"
                  />
                  <p className="text-body-sm mt-3 text-body">
                    {program.description}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Walk — a quiet moment before the final ask. The path itself
          (its Heard / Understood / Supported / Empowered waypoints already
          drawn into the illustration) is the whole section, sized so the
          lettering is comfortably legible rather than purely decorative.
          Desktop only — on mobile the fragments read as illegible clutter
          rather than a moment, so the section is skipped entirely there. */}
      <section className="hidden overflow-hidden py-16 sm:py-20 lg:block">
        <div className="relative mx-auto aspect-[3/1] w-full max-w-4xl px-6">
          <Image
            src="/images/mission-support-path.png"
            alt={PATH_FULL_ALT}
            fill
            sizes="900px"
            className="object-contain"
          />
        </div>
      </section>

      <CtaBanner
        eyebrow="Get Support"
        title="Apply for family assistance or start an advocacy request"
        description="Serving families across the DMV region with IEP/504 representation, evaluation and therapy grants, and district advocacy."
        primary={{ label: "Apply for Family Aid", href: "/contact" }}
        decoration={
          <HandDrawnStroke
            className="pointer-events-none absolute right-[12%] bottom-[22%] hidden h-8 w-8 opacity-[0.16] lg:block"
            d="M16,28 C2,18 2,7 10,4 C14,2.5 16,6 16,8 C16,6 18,2.5 22,4 C30,7 30,18 16,28 Z"
            color="var(--arm-media)"
            strokeWidth={1.4}
            viewBox="0 0 32 32"
          />
        }
      />

      {/* Give — a quieter closing section for anyone who came here wanting
          to donate rather than apply for aid, in the same eyebrow +
          hand-drawn-accent language as the rest of the page rather than a
          bolted-on separate widget. */}
      <section id="give" className="relative overflow-hidden py-20 sm:py-24 scroll-mt-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow text-arm-mission-ink">Give</p>
            <h2 className="text-h2 mt-3 text-ink">Partner with Mission 139</h2>
            <HandDrawnStroke
              className="mx-auto mt-3 h-2 w-14"
              d="M2,4 C12,1 24,6 38,3"
              color="var(--arm-mission)"
              strokeWidth={1.6}
              viewBox="0 0 40 8"
            />
            <p className="text-quote mx-auto mt-5 max-w-xl text-ink">
              &quot;Speak up for those who cannot speak for themselves…defend
              the rights of the poor and needy.&quot;
            </p>
            <p className="caption mt-2 text-muted-ink">Proverbs 31:8–9</p>
            <p className="text-body-sm mx-auto mt-5 max-w-xl text-body">
              Your tax-deductible gift funds advocacy, IEP coaching, and
              educational access for neurodivergent students and their
              families — give once, and every dollar goes toward carrying
              out the mission.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-10 rounded-2xl border border-hairline bg-canvas-soft p-7 text-left sm:p-10">
            <DonateForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}

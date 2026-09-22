import type { Metadata } from "next"
import Image from "next/image"
import { Quotes, UserCircle } from "@phosphor-icons/react/dist/ssr"

import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { CtaBanner } from "@/components/cta-banner"
import { Reveal } from "@/components/reveal"
import { ArtDefs, HandDrawnStroke, OrganicBlob } from "@/components/organic-art"
import { ReadMore } from "@/components/read-more"
import { StatGrid } from "@/components/stat-grid"
import { COACHING_TEAM, IMPACT_STATS, SCHOOLS_SERVED, SITE } from "@/lib/content"

export const metadata: Metadata = {
  title: "About | The Beautifully Human Educator",
}

const FOUNDER_PHOTO_ALT = `${SITE.founderName}, smiling, wearing glasses and a yellow blazer`

export default function AboutPage() {
  return (
    <>
      <ArtDefs />

      <PageHero
        className="overflow-hidden"
        eyebrow="About"
        title="A career built on the conviction that education must stay human"
        description="The Beautifully Human Educator and Mission 139 are two dimensions of one calling: the leadership, thought-leadership, and advocacy work of Cyrkle B. Brent, M.Ed."
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

      {/* Founder Story — a real photo of her now, given a soft organic
          mask (irregular rounded corners, no hard rectangle) rather than a
          photo card, so it sits gently in the composition rather than
          reading as a boxed headshot. */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <Reveal className="relative z-10">
              <SectionHeading eyebrow="Founder Story" title="From the classroom to the ecosystem" />
              <p className="mt-5 text-body">
                For more than two decades, {SITE.founderName} has served
                students, families, and school communities as a special
                educator, instructional leader, and principal, work that
                includes guiding a school to recognition as a 2022 National
                Blue Ribbon School. But her work has never been defined by
                titles or accolades. It has been shaped by one conviction:
                education must remain human.
              </p>
              <p className="mt-4 text-body">
                The Beautifully Human Educator grew from that conviction: a
                leadership and professional-learning platform built on the
                belief that educators do their most meaningful work when
                they lead with both excellence and humanity. Through
                reflection, professional learning, thought leadership, and
                practical tools, TBHE challenges educators to think deeply,
                lead courageously, protect their creativity, and build
                classrooms where both adults and children can thrive.
              </p>
              <p className="text-body-sm mt-4 text-muted-ink">
                BS, Towson State University &middot; Master&apos;s, Notre
                Dame of Maryland
              </p>
            </Reveal>

            <Reveal delay={0.05} className="relative mx-auto w-[78%] sm:w-[60%] lg:mx-0 lg:w-full">
              <div className="relative aspect-[4/5] w-full -rotate-1 overflow-hidden rounded-[12%] shadow-[0_30px_60px_-30px_rgba(37,24,39,0.35)]">
                <Image
                  src="/images/founder-headshot.jpg"
                  alt={FOUNDER_PHOTO_ALT}
                  fill
                  sizes="(max-width: 1024px) 60vw, 32vw"
                  className="object-cover object-top"
                />
              </div>
              <p className="text-h3 mt-6 text-center text-ink lg:text-left">
                {SITE.founderName}, {SITE.founderCredential}
              </p>
              <p className="caption mt-1 text-center text-muted-ink lg:text-left">
                {SITE.founderTitle}
              </p>
              <p className="caption mt-0.5 text-center text-muted-ink lg:text-left">
                {SITE.founderSecondaryTitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Coaching Team — real portrait photos front and center, matching
          the weight the booking service cards give their photos, rather
          than a small circular thumbnail beside the text. */}
      <section className="section pt-0">
        <Reveal className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="The Team"
            title="Dedication. Expertise. Passion. Unmatched."
            description="TBHE supports school administrators, classroom teachers, and organization leadership teams to create and sustain nurturing, inclusive environments that don't sacrifice excellence, rigor, or the wellbeing of the educator or staff."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COACHING_TEAM.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-2xl border border-hairline bg-surface-card"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-arm-consulting/5">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <UserCircle
                        size={56}
                        weight="light"
                        className="text-arm-consulting/30"
                      />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-h3-alt text-ink">{member.name}</p>
                  <p className="caption mt-1 text-muted-ink">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Impact — real, client-provided metrics. Stat tiles reuse the
          homepage's StatGrid so the two don't drift into different visual
          languages for the same kind of data. */}
      <section className="section pt-0">
        <Reveal className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Impact"
            title="From advocacy to execution"
            description="Through TBHE and Mission 139, Cyrkle B. Brent, M.Ed. has helped school communities move from recognizing a need to building responsive systems that serve neurodivergent learners."
          />
          <div className="mt-10">
            <StatGrid stats={IMPACT_STATS} />
          </div>
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <p className="eyebrow text-muted-ink">School Communities Served</p>
            <p className="text-body-sm max-w-xl text-body">
              {SCHOOLS_SERVED.join(" · ")}
            </p>
          </div>
          <p className="text-body-sm mx-auto mt-8 max-w-2xl text-center text-body">
            Our impact extends beyond offering recommendations. We help
            families understand schools, equip educators to respond more
            effectively, and support organizations in building sustainable
            systems from the ground up — because meaningful inclusion
            requires more than good intentions.
          </p>
        </Reveal>
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
          <p className="mx-auto mt-5 max-w-xl text-body">
            Mission 139 takes its name from Psalm 139, a reminder that
            every person is fearfully and wonderfully made. It was born from{" "}
            {SITE.founderName}&apos;s experience as both an educator and
            advocate, after witnessing too many children being
            misunderstood, underestimated, or expected to fit systems that
            were never designed with their needs in mind. Difference is not
            deficiency.
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
          <p className="text-body-sm mx-auto mt-8 max-w-xl text-body">
            Together, TBHE and Mission 139 are two dimensions of one calling:
            transforming education by honoring the humanity, brilliance, and
            unique design of every person within it.
          </p>
        </Reveal>
      </section>

      {/* A Personal Note — a longer, personal endorsement rather than a
          short client pull-quote, so it gets its own quiet card treatment
          instead of the homepage testimonial's paper-clip styling. */}
      <section className="section relative overflow-hidden">
        <Reveal className="relative mx-auto max-w-2xl rounded-2xl border border-hairline bg-surface-card p-8 shadow-[0_18px_40px_-26px_rgba(37,24,39,0.15)] sm:p-12">
          <p className="eyebrow text-center text-primary">A Personal Note</p>
          <div className="mt-6 flex flex-col items-start gap-4 text-body">
            <ReadMore>
              {[
                <p key="1">
                  {SITE.name} is the standard of excellence when it comes to
                  educational leadership, professional development, and
                  supporting the diverse needs of students, families, and
                  school communities. {SITE.founderName} brings a rare
                  combination of expertise, authenticity, compassion, and
                  vision that immediately sets her apart.
                </p>,
                <p key="2">
                  Whether you are a teacher seeking growth, a school leader
                  striving to strengthen your culture, an organization
                  looking to create meaningful impact, or a parent
                  advocating for the best outcomes for your child, you can
                  expect a transformative experience.{" "}
                  {SITE.founderName}&apos;s ability to connect people,
                  develop leaders, and champion students, especially those
                  with unique learning needs, is truly exceptional.
                </p>,
                <p key="3">
                  What makes {SITE.name} special is that the work never
                  loses sight of the people it serves. Every strategy,
                  conversation, and partnership is rooted in the belief that
                  students, families, and educators deserve to be seen,
                  valued, and empowered to succeed.
                </p>,
                <p key="4">
                  I wholeheartedly recommend {SITE.name} to schools,
                  districts, educational organizations, community leaders,
                  and anyone committed to creating better outcomes for
                  children. If you are looking for a trusted partner who
                  delivers both excellence and impact, this is the
                  organization to choose. The difference being made in the
                  lives of students, parents, educators, and leaders is both
                  meaningful and lasting.
                </p>,
              ]}
            </ReadMore>
          </div>
        </Reveal>
      </section>

      {/* Advisory Board — pending as of the rebrand. Structured so it can
          be swapped for a real member grid (same pattern as the Coaching
          Team above) once board bios are finalized. */}
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
                  Our advisory board is being finalized as part of TBHE&apos;s
                  rebrand. Updated board members and biographies will appear
                  here soon.
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

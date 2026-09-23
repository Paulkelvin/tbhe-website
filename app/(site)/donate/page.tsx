import Image from "next/image"
import Link from "next/link"
import { Quotes } from "@phosphor-icons/react/dist/ssr"

import { PageHero } from "@/components/page-hero"
import { DonateForm } from "@/components/donate-form"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { OrganicBlob } from "@/components/organic-art"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Donate to Mission 139",
  description:
    "Support Mission 139's advocacy, IEP coaching, and financial aid for neurodivergent students and their families with a one-time gift.",
  path: "/donate",
  image: "/images/mission-anchor.jpg",
})

const ADVOCATE_MEETING_ALT =
  "A family advocate and a mother reviewing an IEP document together at a table while her son reads a book beside them, in a warm office with a bookshelf and community resources pinned to a corkboard"

export default function DonatePage() {
  return (
    <>
      <PageHero
        className="overflow-hidden"
        eyebrow="Mission 139"
        title="Partner with Mission 139"
        description="Invest in a child's potential. Your tax-deductible gift helps us provide advocacy, IEP coaching, and educational access for neurodivergent students and their families — give once, and every dollar goes toward carrying out the mission."
        decoration={
          <OrganicBlob
            color="var(--arm-mission)"
            variant={0}
            filterId="paper-roughen-1"
            rotate={-6}
            className="top-[-20%] left-[-14%] h-[140%] w-[40%] opacity-[0.08]"
          />
        }
      />

      <section className="section">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/mission-anchor.jpg"
              alt={ADVOCATE_MEETING_ALT}
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.05}>
            <SectionHeading eyebrow="Why Give?" title="Every dollar stands in the gap" />
            <p className="text-body-sm mt-4 text-body">
              Mission 139 exists to stand in the gap, offering specialized
              advocacy, educational access, and unwavering support for
              children with unique learning needs. From IEP coaching to
              family empowerment, your generosity fuels our ability to
              serve.
            </p>
            <p className="text-body-sm mt-4 text-body">
              Together, we can ensure every child receives the support they
              need to thrive — in school, at home, and in their own
              potential.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <Reveal className="relative mx-auto max-w-2xl -rotate-1 overflow-hidden rounded-sm border border-hairline bg-surface-card p-10 text-center shadow-[0_18px_40px_-26px_rgba(37,24,39,0.3)]">
          <Quotes size={36} weight="fill" className="mx-auto text-arm-mission-ink/25" />
          <p className="text-quote mt-4 text-ink">
            &quot;Speak up for those who cannot speak for themselves…defend
            the rights of the poor and needy.&quot;
          </p>
          <p className="caption mt-4 text-muted-ink">Proverbs 31:8–9</p>
          <p className="text-body-sm mx-auto mt-6 max-w-md text-body">
            We believe in seeing every child the way they deserve to be
            seen: beautifully made, uniquely gifted, and deeply worthy of
            support.
          </p>
        </Reveal>
      </section>

      <section className="section pt-0">
        <Reveal className="mx-auto max-w-xl rounded-2xl border border-hairline bg-canvas p-7 sm:p-10">
          <p className="eyebrow text-arm-mission-ink">Support our Mission</p>
          <h2 className="text-h2 mt-2 text-ink">Help us make a difference.</h2>
          <div className="mt-6">
            <DonateForm />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mx-auto mt-6 max-w-xl text-center">
          <p className="text-body-sm text-muted-ink">
            Have questions before giving?{" "}
            <Link href="/contact" className="font-semibold text-arm-mission-ink hover:underline">
              Get in touch
            </Link>{" "}
            or learn more about{" "}
            <Link href="/ecosystem/mission-139" className="font-semibold text-arm-mission-ink hover:underline">
              Mission 139&apos;s work
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  )
}

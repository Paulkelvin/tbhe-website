import Link from "next/link"

import { PageHero } from "@/components/page-hero"
import { pageMetadata } from "@/lib/seo"
import { getSiteSettings } from "@/sanity/queries"

export const metadata = pageMetadata({
  title: "Accessibility Statement",
  description:
    "Our commitment to making www.tbheducator.com usable for everyone, including people with disabilities and neurodivergent visitors.",
  path: "/accessibility",
})

export default async function AccessibilityPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <PageHero eyebrow="Legal" title="Accessibility Statement" />

      <section className="section">
        <div className="prose-legal mx-auto max-w-2xl">
          <p className="text-sm text-muted-ink">Last updated: October 4, 2026</p>

          <p>
            {settings.siteName} serves educators and families of neurodivergent students, so we want this site
            to work well for everyone, including people who use screen readers, keyboard navigation, magnification,
            or reduced-motion settings.
          </p>

          <h2>Our goal</h2>
          <p>
            We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. We regularly test the site
            with automated accessibility checks and by hand on phones, tablets, and desktop computers.
          </p>

          <h2>What we have in place</h2>
          <ul>
            <li>Text and buttons designed for readable color contrast.</li>
            <li>Every page can be used with a keyboard, with visible focus outlines.</li>
            <li>Descriptive alternative text on meaningful images.</li>
            <li>Clear form labels and error messages.</li>
            <li>Animations and the homepage video respect your device&apos;s &quot;reduce motion&quot; setting.</li>
            <li>No flashing content, and videos play without sound.</li>
          </ul>

          <h2>Third-party tools</h2>
          <p>
            Some features are provided by other companies, including Calendly (scheduling) and Square (payments).
            We choose providers with accessibility in mind, but we do not control their pages.
          </p>

          <h2>Tell us about a problem</h2>
          <p>
            If anything on this site is hard to use, or you need information in a different format, please tell us.
            Email <a href={`mailto:${settings.email}`}>{settings.email}</a>
            {settings.phone ? <>, call {settings.phone},</> : null} or use our <Link href="/contact">Contact page</Link>.
            We aim to respond within five business days.
          </p>
        </div>
      </section>
    </>
  )
}

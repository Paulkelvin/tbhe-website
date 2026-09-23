import Link from "next/link"

import { PageHero } from "@/components/page-hero"
import { pageMetadata } from "@/lib/seo"
import { getSiteSettings } from "@/sanity/queries"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How The Beautifully Human Educator collects, uses, and protects information submitted through our contact, booking, donation, and newsletter forms.",
  path: "/privacy",
})

export default async function PrivacyPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />

      <section className="section">
        <div className="prose-legal mx-auto max-w-2xl">
          <p className="text-sm text-muted-ink">Last updated: September 19, 2026</p>

          <p>
            This Privacy Policy explains what information {settings.siteName}{" "}
            (&quot;{settings.shortName},&quot; &quot;we,&quot; &quot;us&quot;)
            collects through thebeautifullyhumaneducator.com (the
            &quot;Site&quot;), how we use it, and the choices you have. It
            covers all three arms of the ecosystem: Educational Consulting
            &amp; Coaching, Mission 139, and Media &amp; Publishing.
          </p>

          <h2>Information we collect</h2>
          <p>We collect information you choose to give us directly, through:</p>
          <ul>
            <li>
              <strong>The Contact form:</strong> your name, email address,
              organization (optional), the reason for reaching out, and your
              message.
            </li>
            <li>
              <strong>The Speaker Booking form:</strong> your name, email
              address, organization or event name, preferred event date,
              keynote topic, estimated audience size, and any additional
              details you provide.
            </li>
            <li>
              <strong>Newsletter signup:</strong> your email address.
            </li>
            <li>
              <strong>Donations:</strong> if you donate to Mission 139, your
              payment is handled entirely by Square, our payment processor.
              We do not receive or store your card number or other payment
              credentials; Square provides us with confirmation that a
              donation was made and the amount.
            </li>
            <li>
              <strong>Scheduling a consultation:</strong> the booking
              calendar is powered by Calendly. Information you enter there
              (name, email, selected time) is collected by Calendly on our
              behalf, subject to{" "}
              <a
                href="https://calendly.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Calendly&apos;s own privacy policy
              </a>
              .
            </li>
          </ul>
          <p>
            We do not currently use analytics, advertising, or tracking
            cookies on this Site. Third-party services embedded on the Site
            (Calendly&apos;s scheduling widget, Square&apos;s checkout page)
            may set their own cookies under their own privacy policies,
            which we don&apos;t control.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your inquiry, application, or booking request.</li>
            <li>
              To process and confirm donations, and to send you a receipt for
              tax purposes.
            </li>
            <li>To send newsletter updates, if you signed up for them.</li>
            <li>
              To evaluate and follow up on Mission 139 family assistance
              applications and advocacy requests.
            </li>
          </ul>
          <p>
            We do not sell your personal information, and we do not share it
            with third parties for their own marketing purposes.
          </p>

          <h2>Where your information goes</h2>
          <p>
            Form submissions are delivered to our team by email through
            Resend, our email delivery provider. Donation payments are
            processed by Square. Consultation scheduling is handled by
            Calendly. Each of these providers processes data under its own
            privacy policy and security practices.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            Mission 139&apos;s advocacy and family assistance programs serve
            families of neurodivergent children, but the Site itself is
            directed at parents, guardians, and adult professionals. We do
            not knowingly collect personal information directly from
            children under 13. If you believe a child has provided us with
            personal information, please contact us and we will delete it.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct, or delete the personal
            information we hold about you, or unsubscribe from newsletter
            emails at any time, by reaching out through our{" "}
            <Link href="/contact">Contact page</Link>.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We&apos;ll
            update the &quot;Last updated&quot; date above when we do.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy? Reach out through our{" "}
            <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </section>
    </>
  )
}

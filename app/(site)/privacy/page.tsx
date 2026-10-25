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
          <p className="text-sm text-muted-ink">Last updated: October 25, 2026</p>

          <p>
            This Privacy Policy explains what information {settings.siteName}{" "}
            (&quot;{settings.shortName},&quot; &quot;we,&quot; &quot;us&quot;)
            collects through www.tbheducator.com (the
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
              credentials. When a payment (a donation or a coaching
              payment) is completed, we keep a record of your name, email
              address, the amount, what it was for, and the receipt number,
              and we email a confirmation to you and to our team.
            </li>
            <li>
              <strong>The H.U.M.A.N. assistant:</strong> messages you type into
              the chat are sent to OpenAI to generate a reply. If you choose to
              share your details through the &quot;Talk with our team&quot;
              form, we also collect your name, email address, role, inquiry
              type, city and state, timeline, and message. Please do not send
              medical records, IEP documents, or your child&apos;s full name
              through the assistant.
            </li>
            <li>
              <strong>Scheduling a consultation:</strong> the booking
              calendar is powered by Calendly. Information you enter there
              (name, email, selected time) is collected by Calendly on our
              behalf, subject to{" "}
              <a
                href="https://calendly.com/privacy"
                target="_blank"
                rel="noreferrer noopener"
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
              and advocacy requests.
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
            Calendly. Chat messages sent to the H.U.M.A.N. assistant are
            processed by OpenAI to generate a response, under OpenAI&apos;s API
            terms. Each of these providers processes data under its own
            privacy policy and security practices.
          </p>

          <h2>The H.U.M.A.N. assistant</h2>
          <p>
            H.U.M.A.N. is an AI assistant, not a person, attorney, clinician,
            or school official. It can explain general educational processes
            and connect you with the right team, but it does not give legal,
            medical, or psychological advice, and it does not decide
            eligibility for Mission 139 assistance or any service.
          </p>
          <p>
            We do not store chat transcripts on our servers; the conversation
            stays in your browser for the current visit. If you submit the
            &quot;Talk with our team&quot; form, the details you enter are
            emailed to the appropriate inbox and may also trigger an automatic
            acknowledgment email to you. Mission 139 funding and eligibility
            decisions are always made by authorized people, never by the
            assistant.
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
          <p>
            When you contact us about family assistance or advocacy, please
            share only what we need to get started. Do not send medical
            records, evaluations, or your child&apos;s full diagnosis through
            the contact form; we will ask for anything further directly and
            privately.
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

import type { Metadata } from "next"
import Link from "next/link"

import { PageHero } from "@/components/page-hero"
import { SITE } from "@/lib/content"

export const metadata: Metadata = {
  title: "Terms of Service | The Beautifully Human Educator",
}

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />

      <section className="section">
        <div className="prose-legal mx-auto max-w-2xl">
          <p className="text-sm text-muted-ink">Last updated: September 19, 2026</p>

          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of
            thebeautifullyhumaneducator.com (the &quot;Site&quot;), operated
            by {SITE.name} (&quot;{SITE.shortName},&quot; &quot;we,&quot;
            &quot;us&quot;), across all three arms of the ecosystem:
            Educational Consulting &amp; Coaching, Mission 139, and Media
            &amp; Publishing. By using the Site, you agree to these Terms.
          </p>

          <h2>Our services</h2>
          <p>
            Through the Site you can learn about and request: professional
            development and instructional coaching (Educational Consulting
            &amp; Coaching); special education advocacy, family assistance
            grants, and IEP/504 support (Mission 139, a 501(c)(3) nonprofit
            organization); and research, keynotes, webinars, and community
            events (Media &amp; Publishing). Specific engagements (a
            consulting scope of work, a family assistance award, a speaking
            fee) are agreed separately once we follow up with you; nothing
            on the Site itself is a binding offer of services.
          </p>

          <h2>Using the Site</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the Site for any unlawful purpose or in a way that
              infringes anyone else&apos;s rights.
            </li>
            <li>
              Attempt to gain unauthorized access to the Site, its forms, or
              any connected systems.
            </li>
            <li>
              Scrape, harvest, or misuse content from the Site beyond normal
              browsing.
            </li>
            <li>
              Submit false information through our forms, including the
              family assistance application or speaker booking request.
            </li>
          </ul>

          <h2>Donations</h2>
          <p>
            Donations to Mission 139 are processed by Square, our
            third-party payment processor, and are subject to Square&apos;s
            own terms. Donations are generally non-refundable except where
            required by law or at our discretion. Mission 139 is a
            501(c)(3) nonprofit organization; consult your tax advisor
            regarding the deductibility of your donation.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The Site&apos;s content, including text, published articles,
            toolkits, and design, belongs to {SITE.shortName} or its
            licensors, unless otherwise noted. You
            may view and share it for personal, non-commercial purposes, but
            may not republish, sell, or otherwise use it commercially
            without our written permission.
          </p>

          <h2>Third-party services</h2>
          <p>
            The Site uses Calendly to schedule consultations and Square to
            process donations. Your use of those embedded tools is also
            subject to their own terms of service, which we don&apos;t
            control.
          </p>

          <h2>No warranty; limitation of liability</h2>
          <p>
            The Site and its content are provided &quot;as is,&quot; without
            warranties of any kind. To the fullest extent permitted by law,{" "}
            {SITE.shortName} is not liable for any indirect, incidental, or
            consequential damages arising from your use of the Site.
          </p>

          <h2>Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. We&apos;ll update
            the &quot;Last updated&quot; date above when we do; continued
            use of the Site after a change means you accept the updated
            Terms.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about these Terms? Reach out through our{" "}
            <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </section>
    </>
  )
}

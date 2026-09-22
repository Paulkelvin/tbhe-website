import type { Metadata } from "next"
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr"

import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { Reveal } from "@/components/reveal"
import { OrganicBlob } from "@/components/organic-art"
import { BUSINESS_CONTACT } from "@/lib/content"

export const metadata: Metadata = {
  title: "Contact | The Beautifully Human Educator",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        className="overflow-hidden"
        eyebrow="Contact"
        title="One inbox for consulting, advocacy, and media"
        description="Tell us why you're reaching out and the right person on the TBHE team will follow up."
        decoration={
          <OrganicBlob
            color="var(--primary)"
            variant={0}
            filterId="paper-roughen-1"
            rotate={8}
            className="top-[-18%] right-[-12%] h-[140%] w-[36%] opacity-[0.07]"
          />
        }
      />

      {/* Send a message — the same two-column, label-left/form-right
          rhythm used by the Media and Consulting booking sections, so the
          page reads consistently with the rest of the site instead of
          folding the form into the hero itself. */}
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal className="min-w-0">
            <p className="eyebrow text-primary">Get in Touch</p>
            <h2 className="text-h2 mt-3 text-ink">Send us a message</h2>
            <p className="text-lead mt-4 max-w-sm text-body">
              Consulting, Mission 139, and media inquiries all land in the
              same inbox, and the right person on the TBHE team will follow
              up.
            </p>

            <div className="mt-8 flex flex-col gap-4 text-sm text-body">
              <a
                href={BUSINESS_CONTACT.phoneHref}
                className="group flex items-center gap-3 transition-colors hover:text-ink"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-primary transition-colors group-hover:border-primary">
                  <Phone size={16} />
                </span>
                <span className="min-w-0 break-words">{BUSINESS_CONTACT.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_CONTACT.email}`}
                className="group flex items-center gap-3 transition-colors hover:text-ink"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-primary transition-colors group-hover:border-primary">
                  <EnvelopeSimple size={16} />
                </span>
                <span className="min-w-0 break-words">{BUSINESS_CONTACT.email}</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-primary">
                  <MapPin size={16} />
                </span>
                <span className="min-w-0 break-words">{BUSINESS_CONTACT.address}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}

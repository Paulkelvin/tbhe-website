import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr"

import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { Reveal } from "@/components/reveal"
import { OrganicBlob } from "@/components/organic-art"
import { pageMetadata } from "@/lib/seo"
import { getSiteSettings } from "@/sanity/queries"

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Reach The Beautifully Human Educator for consulting, Mission 139 family advocacy, or media inquiries. One inbox, one team, real follow-up.",
  path: "/contact",
})

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const address = `${settings.addressLine1}, ${settings.addressCity}, ${settings.addressState} ${settings.addressZip}`

  return (
    <>
      <PageHero
        className="overflow-hidden"
        compact
        eyebrow="Contact"
        title="One inbox for consulting, advocacy, and media"
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
          rhythm used by the Media and Consulting booking sections. The
          intro is kept short and the contact-info block moved below the
          form so the form itself sits near the top of the page instead
          of after a long stack of text on mobile. */}
      <section className="section pt-8 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          <Reveal className="min-w-0">
            <p className="eyebrow text-primary">Get in Touch</p>
            <h2 className="text-h2 mt-3 text-ink">Send us a message</h2>
            <p className="text-lead mt-3 max-w-sm text-body">
              Consulting, Mission 139, and media inquiries all reach the
              right person on the TBHE team.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
        </div>

        <Reveal
          delay={0.1}
          className="mt-10 flex flex-col gap-4 border-t border-hairline pt-8 text-sm text-body sm:flex-row sm:flex-wrap sm:items-center sm:gap-8"
        >
          <a
            href={`tel:+1${settings.phone.replace(/\D/g, "")}`}
            className="group flex min-w-0 items-center gap-3 transition-colors hover:text-ink"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-primary transition-colors group-hover:border-primary">
              <Phone size={16} />
            </span>
            <span className="min-w-0 break-words">{settings.phone}</span>
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="group flex min-w-0 items-center gap-3 transition-colors hover:text-ink"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-primary transition-colors group-hover:border-primary">
              <EnvelopeSimple size={16} />
            </span>
            <span className="min-w-0 break-words">{settings.email}</span>
          </a>
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-primary">
              <MapPin size={16} />
            </span>
            <span className="min-w-0 break-words">{address}</span>
          </div>
        </Reveal>
      </section>
    </>
  )
}

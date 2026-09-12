import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "Contact — The Beautifully Human Educator",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="One inbox for consulting, advocacy, and media"
        description="Tell us why you're reaching out and the right person on the TBHE team will follow up."
      />

      <section className="mx-auto w-full max-w-2xl px-6 py-14 sm:px-8 sm:py-20 lg:py-(--section-padding)">
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
    </>
  )
}

import type { Metadata } from "next"

import { ContactHero } from "@/components/contact-hero"

export const metadata: Metadata = {
  title: "Contact — The Beautifully Human Educator",
}

export default function ContactPage() {
  return <ContactHero />
}

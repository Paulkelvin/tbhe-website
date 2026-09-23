import type { Metadata } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { BUSINESS_CONTACT, SITE, SITE_URL, SOCIAL_LINKS } from "@/lib/content"

const fontSans = Manrope({ subsets: ["latin"], variable: "--font-sans" })
const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} (${SITE.shortName})`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} (${SITE.shortName})`,
    description: SITE.description,
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} (${SITE.shortName})`,
    description: SITE.description,
  },
}

// Organization schema — every field below is drawn directly from the
// site's own verified contact/social data (lib/content.ts). No ratings,
// reviews, or unverified claims are included.
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  alternateName: SITE.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/images/tbhe-logo.png`,
  description: SITE.description,
  email: BUSINESS_CONTACT.email,
  telephone: BUSINESS_CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "12530 Fairwood Pkwy Ste. 102 #568",
    addressLocality: "Bowie",
    addressRegion: "MD",
    postalCode: "20720",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: SITE.founderName,
  },
  sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.linkedin],
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontSans.variable,
        fontDisplay.variable
      )}
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <SiteHeader />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}

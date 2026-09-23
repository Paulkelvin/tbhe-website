import type { Metadata } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"

import "@/app/(site)/globals.css"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { SITE_URL } from "@/lib/content"
import { getArms, getNavLinks, getSiteSettings } from "@/sanity/queries"

const fontSans = Manrope({ subsets: ["latin"], variable: "--font-sans" })
const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
  style: ["normal", "italic"],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const fullName = `${settings.siteName} (${settings.shortName})`
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: fullName, template: `%s | ${settings.shortName}` },
    description: settings.description,
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      title: fullName,
      description: settings.description,
      url: SITE_URL,
    },
    twitter: { card: "summary", title: fullName, description: settings.description },
  }
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function RootLayout({ children }: RootLayoutProps) {
  const [settings, navLinks, arms] = await Promise.all([
    getSiteSettings(),
    getNavLinks(),
    getArms(),
  ])

  const instagram = settings.socialLinks.find((s) => s.platform === "instagram")?.url
  const linkedin = settings.socialLinks.find((s) => s.platform === "linkedin")?.url

  // Organization schema — every field below is drawn directly from the
  // site's own verified contact/social data, managed in Sanity. No
  // ratings, reviews, or unverified claims are included.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    alternateName: settings.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/tbhe-logo.png`,
    description: settings.description,
    email: settings.email,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.addressLine1,
      addressLocality: settings.addressCity,
      addressRegion: settings.addressState,
      postalCode: settings.addressZip,
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: settings.founderName,
    },
    sameAs: [instagram, linkedin].filter(Boolean),
  }

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteHeader siteName={settings.siteName} navLinks={navLinks} arms={arms} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Fraunces, Libre_Franklin } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { SITE } from "@/lib/content"

const fontSans = Libre_Franklin({ subsets: ["latin"], variable: "--font-sans" })
const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: `${SITE.name} (${SITE.shortName})`,
  description: SITE.description,
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
        <SiteHeader />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}

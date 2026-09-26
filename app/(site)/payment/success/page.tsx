import type { Metadata } from "next"
import Link from "next/link"

import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Payment Received",
  description: "Confirmation of your payment to The Beautifully Human Educator.",
  path: "/payment/success",
})

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ context?: string; interval?: string; service?: string }>
}) {
  const { context, interval, service } = await searchParams

  const isDonation = context === "donation"
  const isMonthly = interval === "monthly"

  const title = isDonation
    ? isMonthly
      ? "Your monthly gift is set up"
      : "Thank you for your gift"
    : "Payment received"

  const description = isDonation
    ? isMonthly
      ? "Your recurring donation to Mission 139 is confirmed. You'll be charged this amount every month until you choose to cancel — reach out any time if you need to make a change."
      : "Your one-time donation to Mission 139 is confirmed. A receipt has been sent to your email."
    : service
      ? `Your payment for ${service} is confirmed. A receipt has been sent to your email, and our team will follow up with next steps.`
      : "Your payment is confirmed. A receipt has been sent to your email, and our team will follow up with next steps."

  return (
    <PageHero eyebrow={isDonation ? "Mission 139" : "TBHE"} title={title} description={description}>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </PageHero>
  )
}

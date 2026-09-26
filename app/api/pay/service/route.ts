import { NextResponse } from "next/server"

import { createServicePaymentCheckoutUrl } from "@/lib/square"
import { getBookableServices } from "@/sanity/queries"

// The price is always looked up server-side by the service's own title —
// never trusted from the query string — so a request can't be tampered
// with to pay a different amount than the service's real, configured price.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const serviceTitle = searchParams.get("service")

  const services = await getBookableServices()
  const service = services.find((s) => s.title === serviceTitle)

  if (!service || !service.priceCents) {
    // Unknown service, or one with no confirmed price yet (quote-based
    // engagements, or a priced service whose price hasn't been set) —
    // fall back to Contact rather than error.
    return NextResponse.redirect(new URL("/contact?reason=consulting", request.url))
  }

  const checkoutUrl = await createServicePaymentCheckoutUrl({
    serviceName: service.title,
    amountCents: service.priceCents,
  })

  if (!checkoutUrl) {
    return NextResponse.redirect(new URL("/contact?reason=consulting", request.url))
  }

  return NextResponse.redirect(checkoutUrl)
}

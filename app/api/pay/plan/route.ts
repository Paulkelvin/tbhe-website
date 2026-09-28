import { NextResponse } from "next/server"

import { createServicePaymentCheckoutUrl } from "@/lib/square"
import { getCoachingPlans } from "@/sanity/queries"

export async function GET(request: Request) {
  const planId = new URL(request.url).searchParams.get("plan")
  const plan = (await getCoachingPlans()).find((p) => p.id === planId)
  const checkoutUrl = plan
    ? await createServicePaymentCheckoutUrl({
        serviceName: `Executive Coaching — ${plan.name}`,
        amountCents: plan.priceCents + plan.setupFeeCents,
      })
    : null

  return NextResponse.redirect(checkoutUrl ?? new URL("/contact?reason=consulting", request.url))
}

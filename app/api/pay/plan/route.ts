import { NextResponse } from "next/server"

import { EXECUTIVE_COACHING_PLANS } from "@/lib/content"
import { createServicePaymentCheckoutUrl } from "@/lib/square"

export async function GET(request: Request) {
  const planId = new URL(request.url).searchParams.get("plan")
  const plan = EXECUTIVE_COACHING_PLANS.find((p) => p.id === planId)
  const checkoutUrl = plan
    ? await createServicePaymentCheckoutUrl({
        serviceName: `Executive Coaching — ${plan.name}`,
        amountCents: plan.priceCents + plan.setupFeeCents,
      })
    : null

  return NextResponse.redirect(checkoutUrl ?? new URL("/contact?reason=consulting", request.url))
}

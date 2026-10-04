import { NextResponse } from "next/server"

import { createDonationCheckoutUrl } from "@/lib/square"

const DEFAULT_AMOUNT_CENTS = 5000 // $50 — used only if the request omits an amount
const MIN_CENTS = 100
const MAX_CENTS = 2_500_000

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const amountParam = searchParams.get("amount")
  const interval = searchParams.get("interval") === "monthly" ? "monthly" : "once"
  // Monthly gifts are whole dollars: each distinct monthly amount becomes a Square catalog item, so this caps how many can exist.
  const parsed = amountParam ? Number(amountParam) : NaN
  const amountCents = Math.round((interval === "monthly" ? Math.round(parsed) : parsed) * 100)

  const checkoutUrl = await createDonationCheckoutUrl(
    Number.isFinite(amountCents) && amountCents >= MIN_CENTS
      ? Math.min(amountCents, MAX_CENTS)
      : DEFAULT_AMOUNT_CENTS,
    interval
  )

  if (!checkoutUrl) {
    // Square isn't configured yet, or the request failed — fall back to
    // Contact rather than error.
    return NextResponse.redirect(new URL("/contact?reason=donate", request.url))
  }

  return NextResponse.redirect(checkoutUrl)
}

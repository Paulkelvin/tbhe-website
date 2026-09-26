import { NextResponse } from "next/server"

import { createDonationCheckoutUrl } from "@/lib/square"

const DEFAULT_AMOUNT_CENTS = 5000 // $50 — used only if the request omits an amount

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const amountParam = searchParams.get("amount")
  const amountCents = amountParam ? Math.round(Number(amountParam) * 100) : NaN
  const interval = searchParams.get("interval") === "monthly" ? "monthly" : "once"

  const checkoutUrl = await createDonationCheckoutUrl(
    Number.isFinite(amountCents) && amountCents > 0 ? amountCents : DEFAULT_AMOUNT_CENTS,
    interval
  )

  if (!checkoutUrl) {
    // Square isn't configured yet, or the request failed — fall back to
    // Contact rather than error.
    return NextResponse.redirect(new URL("/contact?reason=donate", request.url))
  }

  return NextResponse.redirect(checkoutUrl)
}

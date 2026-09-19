import { NextResponse } from "next/server"

import { createDonationCheckoutUrl } from "@/lib/square"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const amountParam = searchParams.get("amount")
  const amountCents = amountParam ? Math.round(Number(amountParam) * 100) : undefined

  const checkoutUrl = await createDonationCheckoutUrl(
    amountCents && Number.isFinite(amountCents) && amountCents > 0 ? amountCents : undefined
  )

  if (!checkoutUrl) {
    // Square isn't configured yet — fall back to Contact rather than error.
    return NextResponse.redirect(new URL("/contact?reason=donate", request.url))
  }

  return NextResponse.redirect(checkoutUrl)
}

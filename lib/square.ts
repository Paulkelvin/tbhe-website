import { randomUUID } from "node:crypto"

import { SquareClient, SquareEnvironment } from "square"

// Env vars to set once available (per Paul: "I will get the envs later"):
// - SQUARE_ACCESS_TOKEN: from the Square Developer Dashboard
// - SQUARE_LOCATION_ID: the location the donation should be recorded against
// - SQUARE_ENVIRONMENT: "production" once live, defaults to "sandbox" so
//   nothing can accidentally take a real payment before it's configured.
//
// This uses Square's "Quick Pay" checkout link, which is a fixed amount per
// link (Square doesn't support a buyer-editable amount here). Real "give
// whatever you want" donations need a Catalog item created with variable
// pricing in the Square Dashboard once the account exists, referenced here
// by its catalogObjectId instead of `quickPay`. Fixed preset amounts (the
// `amountCents` param below) are a reasonable stand-in until then.
const DEFAULT_DONATION_AMOUNT_CENTS = 5000

function getClient() {
  const token = process.env.SQUARE_ACCESS_TOKEN
  if (!token) return null

  return new SquareClient({
    token,
    environment:
      process.env.SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  })
}

export async function createDonationCheckoutUrl(
  amountCents: number = DEFAULT_DONATION_AMOUNT_CENTS
): Promise<string | null> {
  const client = getClient()
  const locationId = process.env.SQUARE_LOCATION_ID

  if (!client || !locationId) {
    console.warn(
      "[square] SQUARE_ACCESS_TOKEN or SQUARE_LOCATION_ID not set — cannot create a donation link."
    )
    return null
  }

  try {
    const response = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      quickPay: {
        name: "Donation to Mission 139",
        priceMoney: {
          amount: BigInt(amountCents),
          currency: "USD",
        },
        locationId,
      },
    })

    return response.paymentLink?.url ?? null
  } catch (error) {
    console.error("[square] Failed to create payment link:", error)
    return null
  }
}

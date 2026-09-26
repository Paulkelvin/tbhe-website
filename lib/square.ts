import { randomUUID } from "crypto"

import { SquareClient, SquareEnvironment } from "square"

import { SITE_URL } from "@/lib/content"

// Server-only. Never import this file from a "use client" component — the
// access token must never reach the browser. Every export here either
// returns a hosted Square checkout URL (or null if Square isn't
// configured/the call failed) or does nothing visible; no secret ever
// crosses into the response.

const CURRENCY = "USD" as const

let cachedClient: SquareClient | null | undefined

function getSquareClient(): SquareClient | null {
  if (cachedClient !== undefined) return cachedClient

  const token = process.env.SQUARE_ACCESS_TOKEN
  if (!token) {
    cachedClient = null
    return cachedClient
  }

  cachedClient = new SquareClient({
    token,
    environment:
      process.env.SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  })
  return cachedClient
}

function getLocationId(): string | null {
  return process.env.SQUARE_LOCATION_ID || null
}

export function isSquareConfigured(): boolean {
  return Boolean(getSquareClient() && getLocationId())
}

/**
 * A one-time, ad hoc "Quick Pay" checkout link for a fixed amount — used
 * for one-time donations and flat-fee service payments. No Catalog setup
 * required on the Square side.
 */
async function createQuickPayCheckoutUrl({
  name,
  amountCents,
  note,
  redirectPath,
}: {
  name: string
  amountCents: number
  note: string
  redirectPath: string
}): Promise<string | null> {
  const square = getSquareClient()
  const locationId = getLocationId()
  if (!square || !locationId) return null

  try {
    const response = await square.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      quickPay: {
        name,
        priceMoney: { amount: BigInt(amountCents), currency: CURRENCY },
        locationId,
      },
      checkoutOptions: {
        redirectUrl: `${SITE_URL}${redirectPath}`,
      },
      paymentNote: note,
    })
    return response.paymentLink?.url ?? null
  } catch (error) {
    console.error("Square createQuickPayCheckoutUrl failed:", error)
    return null
  }
}

// Finds a Catalog object of the given type whose name exactly matches, so
// repeat callers (e.g. many donors picking the same $50/month amount)
// reuse one Catalog object instead of creating a new one on every request.
async function findCatalogObjectByName(
  square: SquareClient,
  objectType: "SUBSCRIPTION_PLAN" | "SUBSCRIPTION_PLAN_VARIATION",
  name: string
): Promise<string | null> {
  try {
    const result = await square.catalog.search({
      objectTypes: [objectType],
      query: { exactQuery: { attributeName: "name", attributeValue: name } },
    })
    const match = result.objects?.find((obj) => {
      const objName =
        obj.type === "SUBSCRIPTION_PLAN"
          ? obj.subscriptionPlanData?.name
          : obj.type === "SUBSCRIPTION_PLAN_VARIATION"
            ? obj.subscriptionPlanVariationData?.name
            : undefined
      return objName === name
    })
    return match?.id ?? null
  } catch (error) {
    console.error("Square findCatalogObjectByName failed:", error)
    return null
  }
}

const MONTHLY_DONATION_PLAN_NAME = "Mission 139 Monthly Giving"

async function findOrCreateMonthlyDonationPlanId(square: SquareClient): Promise<string | null> {
  const existing = await findCatalogObjectByName(square, "SUBSCRIPTION_PLAN", MONTHLY_DONATION_PLAN_NAME)
  if (existing) return existing

  try {
    const created = await square.catalog.object.upsert({
      idempotencyKey: randomUUID(),
      object: {
        type: "SUBSCRIPTION_PLAN",
        id: "#mission-139-monthly-plan",
        subscriptionPlanData: { name: MONTHLY_DONATION_PLAN_NAME },
      },
    })
    return created.catalogObject?.id ?? null
  } catch (error) {
    console.error("Square findOrCreateMonthlyDonationPlanId failed:", error)
    return null
  }
}

async function findOrCreateMonthlyDonationVariationId(
  square: SquareClient,
  planId: string,
  amountCents: number
): Promise<string | null> {
  const variationName = `${MONTHLY_DONATION_PLAN_NAME} — $${(amountCents / 100).toFixed(2)}`

  const existing = await findCatalogObjectByName(square, "SUBSCRIPTION_PLAN_VARIATION", variationName)
  if (existing) return existing

  try {
    const created = await square.catalog.object.upsert({
      idempotencyKey: randomUUID(),
      object: {
        type: "SUBSCRIPTION_PLAN_VARIATION",
        id: "#mission-139-monthly-variation",
        subscriptionPlanVariationData: {
          name: variationName,
          subscriptionPlanId: planId,
          phases: [
            {
              cadence: "MONTHLY",
              recurringPriceMoney: { amount: BigInt(amountCents), currency: CURRENCY },
              ordinal: BigInt(0),
            },
          ],
        },
      },
    })
    return created.catalogObject?.id ?? null
  } catch (error) {
    console.error("Square findOrCreateMonthlyDonationVariationId failed:", error)
    return null
  }
}

/**
 * A recurring monthly donation checkout link for a custom amount. Square
 * subscriptions require a Catalog subscription-plan-variation with a fixed
 * price, so this finds (or lazily creates, on first use) one shared "$X/mo"
 * variation per distinct dollar amount — no manual Catalog setup needed in
 * the Square Dashboard first.
 */
async function createMonthlyDonationCheckoutUrl(amountCents: number): Promise<string | null> {
  const square = getSquareClient()
  const locationId = getLocationId()
  if (!square || !locationId) return null

  try {
    const planId = await findOrCreateMonthlyDonationPlanId(square)
    if (!planId) return null

    const variationId = await findOrCreateMonthlyDonationVariationId(square, planId, amountCents)
    if (!variationId) return null

    const response = await square.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      checkoutOptions: {
        subscriptionPlanId: variationId,
        redirectUrl: `${SITE_URL}/payment/success?context=donation&interval=monthly`,
      },
      paymentNote: "Mission 139 monthly donation",
    })
    return response.paymentLink?.url ?? null
  } catch (error) {
    console.error("Square createMonthlyDonationCheckoutUrl failed:", error)
    return null
  }
}

/**
 * Mission 139 donations. `interval` selects one-time vs. monthly recurring;
 * both support any custom amount. Returns null if Square isn't configured
 * or the request fails, so callers can fall back to /contact.
 */
export async function createDonationCheckoutUrl(
  amountCents: number,
  interval: "once" | "monthly" = "once"
): Promise<string | null> {
  if (!amountCents || amountCents <= 0) return null

  if (interval === "monthly") {
    return createMonthlyDonationCheckoutUrl(amountCents)
  }

  return createQuickPayCheckoutUrl({
    name: "Mission 139 Donation",
    amountCents,
    note: "Mission 139 one-time donation",
    redirectPath: "/payment/success?context=donation&interval=once",
  })
}

/**
 * A one-time payment checkout link for a fixed-price bookable service
 * (currently: Executive Coaching, once a real price is set — see
 * BookableService.priceCents). Quote-based services never call this; their
 * price isn't known until the client scopes and quotes the engagement.
 */
export async function createServicePaymentCheckoutUrl({
  serviceName,
  amountCents,
}: {
  serviceName: string
  amountCents: number
}): Promise<string | null> {
  if (!amountCents || amountCents <= 0) return null

  return createQuickPayCheckoutUrl({
    name: serviceName,
    amountCents,
    note: `TBHE service payment: ${serviceName}`,
    redirectPath: `/payment/success?context=service&service=${encodeURIComponent(serviceName)}`,
  })
}

import type { Square } from "square"

import { SITE_URL } from "@/lib/content"
import { brandedEmail, detailRows, sendEmail } from "@/lib/email"
import { getLocationId, getSquareClient } from "@/lib/square"
import { getAdminClient, hasAdminToken } from "@/sanity/adminClient"
import { getSiteSettings } from "@/sanity/queries"

// Server-only: talks to Square with the access token and writes to Sanity with the admin token.

export type PaymentKind = "donation" | "monthly-donation" | "service"

export type PaymentRecord = {
  _id: string
  squarePaymentId: string
  kind: PaymentKind
  description: string
  status: string
  amountCents: number
  refundedCents: number
  currency: string
  buyerName?: string
  buyerEmail?: string
  cardBrand?: string
  cardLast4?: string
  receiptNumber?: string
  receiptUrl?: string
  orderId?: string
  paidAt: string
  emailsSentAt?: string
}

export const KIND_LABELS: Record<PaymentKind, string> = {
  donation: "Donation",
  "monthly-donation": "Monthly donation",
  service: "Coaching & services",
}

function classify(text: string): PaymentKind {
  const t = text.toLowerCase()
  if (t.includes("monthly")) return "monthly-donation"
  if (t.includes("donation") || t.includes("mission 139")) return "donation"
  return "service"
}

function fullName(first?: string | null, last?: string | null) {
  return [first, last].filter(Boolean).join(" ").trim() || undefined
}

function toCents(money?: Square.Money) {
  return money?.amount ? Number(money.amount) : 0
}

async function buildRecord(payment: Square.Payment): Promise<Omit<PaymentRecord, "_id" | "emailsSentAt">> {
  const square = getSquareClient()
  let lineItemName: string | undefined
  let customerName: string | undefined
  let customerEmail: string | undefined

  if (square && payment.orderId) {
    try {
      const { order } = await square.orders.get({ orderId: payment.orderId })
      lineItemName = order?.lineItems?.find((item) => item.name)?.name ?? undefined
    } catch (error) {
      console.error("[payments] order lookup failed:", error)
    }
  }
  if (square && payment.customerId) {
    try {
      const { customer } = await square.customers.get({ customerId: payment.customerId })
      customerName = fullName(customer?.givenName, customer?.familyName)
      customerEmail = customer?.emailAddress ?? undefined
    } catch (error) {
      console.error("[payments] customer lookup failed:", error)
    }
  }

  const note = payment.note?.replace(/^TBHE service payment:\s*/i, "")
  const description = lineItemName ?? note ?? "Payment"

  return {
    squarePaymentId: payment.id!,
    kind: classify(`${lineItemName ?? ""} ${payment.note ?? ""}`),
    description,
    status: payment.status ?? "UNKNOWN",
    amountCents: toCents(payment.totalMoney ?? payment.amountMoney),
    refundedCents: toCents(payment.refundedMoney),
    currency: payment.totalMoney?.currency ?? payment.amountMoney?.currency ?? "USD",
    buyerName:
      customerName ??
      fullName(payment.billingAddress?.firstName, payment.billingAddress?.lastName) ??
      fullName(payment.shippingAddress?.firstName, payment.shippingAddress?.lastName),
    buyerEmail: payment.buyerEmailAddress ?? customerEmail,
    cardBrand: payment.cardDetails?.card?.cardBrand ?? undefined,
    cardLast4: payment.cardDetails?.card?.last4 ?? undefined,
    receiptNumber: payment.receiptNumber,
    receiptUrl: payment.receiptUrl,
    orderId: payment.orderId,
    paidAt: payment.createdAt ?? new Date().toISOString(),
  }
}

export function formatMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100)
}

async function sendPaymentEmails(record: Omit<PaymentRecord, "_id" | "emailsSentAt">) {
  const amount = formatMoney(record.amountCents, record.currency)
  const date = new Date(record.paidAt).toLocaleDateString("en-US", { dateStyle: "long" })
  const isDonation = record.kind !== "service"
  const adminEmail = process.env.CONTACT_TO_EMAIL
  const ein = isDonation ? (await getSiteSettings()).mission139Ein : undefined

  if (record.buyerEmail) {
    await sendEmail({
      to: record.buyerEmail,
      replyTo: adminEmail,
      subject: isDonation
        ? "Thank you for your gift to Mission 139"
        : "Payment received: The Beautifully Human Educator",
      html: brandedEmail({
        heading: `Thank you${record.buyerName ? `, ${record.buyerName.split(" ")[0]}` : ""}!`,
        intro: isDonation
          ? `We've received your ${record.kind === "monthly-donation" ? "monthly " : ""}donation of ${amount}. Your generosity helps neurodivergent students and their families get the support they deserve.${record.kind === "monthly-donation" ? " Your gift will renew automatically each month." : ""}`
          : `We've received your payment of ${amount} for ${record.description}. We'll be in touch shortly with next steps.`,
        rows: detailRows({
          Amount: amount,
          For: record.description,
          Date: date,
          "Receipt number": record.receiptNumber,
          Card: record.cardBrand && record.cardLast4 ? `${record.cardBrand} ending ${record.cardLast4}` : undefined,
          // IRS written-acknowledgment wording, required for gifts of $250 or more.
          ...(isDonation
            ? {
                Organization: "Mission 139, a 501(c)(3) nonprofit organization",
                EIN: ein,
                "Tax note":
                  "No goods or services were provided in exchange for this contribution. Please keep this email for your tax records.",
              }
            : {}),
        }),
        cta: record.receiptUrl ? { label: "View your receipt", href: record.receiptUrl } : undefined,
      }),
    })
  }

  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      replyTo: record.buyerEmail,
      subject: `New payment: ${amount} — ${record.description}`,
      html: brandedEmail({
        heading: `New ${KIND_LABELS[record.kind].toLowerCase()}: ${amount}`,
        intro: `${record.buyerName ?? record.buyerEmail ?? "Someone"} just paid through the website.`,
        rows: detailRows({
          Amount: amount,
          Type: KIND_LABELS[record.kind],
          For: record.description,
          Name: record.buyerName,
          Email: record.buyerEmail,
          Date: date,
          "Receipt number": record.receiptNumber,
        }),
        cta: { label: "Open payments dashboard", href: `${SITE_URL}/admin/payments` },
      }),
    })
  }
}

/**
 * Upserts one Square payment into Sanity. Emails the payer and the admin
 * inbox the first time a payment is seen as COMPLETED, and never again for
 * the same payment, so Square's webhook retries and later refund updates
 * don't send duplicates.
 */
export async function recordSquarePayment(paymentId: string, { sendEmails }: { sendEmails: boolean }) {
  const square = getSquareClient()
  if (!square || !hasAdminToken()) return null

  const { payment } = await square.payments.get({ paymentId })
  if (!payment?.id) return null

  const record = await buildRecord(payment)
  const client = getAdminClient()
  const _id = `payment-${payment.id}`

  await client.transaction().createIfNotExists({ _id, _type: "payment" }).patch(_id, (p) => p.set(record)).commit()

  if (sendEmails && record.status === "COMPLETED") {
    const current = await client.getDocument<PaymentRecord & { _rev: string }>(_id)
    if (current && !current.emailsSentAt) {
      // ifRevisionId makes the claim fail if a concurrent webhook delivery claimed it first.
      const claimed = await client
        .patch(_id)
        .ifRevisionId(current._rev)
        .set({ emailsSentAt: new Date().toISOString() })
        .commit()
        .then(() => true)
        .catch(() => false)
      if (claimed) await sendPaymentEmails(record)
    }
  }

  return record
}

/** Pulls recent payments from Square into Sanity without emailing anyone. */
export async function syncSquarePayments({ days = 400 }: { days?: number } = {}) {
  const square = getSquareClient()
  const locationId = getLocationId()
  if (!square || !locationId) throw new Error("Square isn't configured (SQUARE_ACCESS_TOKEN / SQUARE_LOCATION_ID).")
  if (!hasAdminToken()) throw new Error("SANITY_API_WRITE_TOKEN isn't set.")

  const beginTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
  const page = await square.payments.list({ locationId, beginTime, sortOrder: "DESC", limit: 100 })

  const existing = new Map(
    (
      await getAdminClient().fetch<{ squarePaymentId: string; status: string; refundedCents: number }[]>(
        `*[_type == "payment"]{ squarePaymentId, status, refundedCents }`
      )
    ).map((p) => [p.squarePaymentId, `${p.status}:${p.refundedCents ?? 0}`])
  )

  let count = 0
  for await (const payment of page) {
    if (!payment.id) continue
    if (existing.get(payment.id) === `${payment.status}:${toCents(payment.refundedMoney)}`) continue
    await recordSquarePayment(payment.id, { sendEmails: false })
    count++
  }
  return count
}

import { PaymentsDashboard } from "@/components/admin/payments-dashboard"
import type { PaymentRecord } from "@/lib/payments"
import { getAdminClient, hasAdminToken } from "@/sanity/adminClient"

export const dynamic = "force-dynamic"
// The Sync from Square action runs on this route and can take a while on the first import.
export const maxDuration = 60

export default async function PaymentsPage() {
  const payments = hasAdminToken()
    ? await getAdminClient().fetch<PaymentRecord[]>(
        `*[_type == "payment" && !(_id in path("drafts.**"))] | order(paidAt desc)[0...2000]{
          _id, squarePaymentId, kind, description, status, amountCents, refundedCents, currency,
          buyerName, buyerEmail, cardBrand, cardLast4, receiptNumber, receiptUrl, orderId, paidAt, emailsSentAt
        }`
      )
    : []

  return (
    <div>
      <p className="eyebrow text-primary">Business</p>
      <h1 className="text-h2 mt-2 text-ink">Payments</h1>
      <p className="text-body-sm mt-2 mb-8 max-w-xl text-body">
        Every donation and coaching payment made through the website. Payers get a confirmation email, and a copy goes
        to your inbox.
      </p>
      <PaymentsDashboard
        payments={payments}
        webhookConfigured={Boolean(process.env.SQUARE_WEBHOOK_SIGNATURE_KEY?.trim())}
        squareConfigured={Boolean(process.env.SQUARE_ACCESS_TOKEN?.trim() && process.env.SQUARE_LOCATION_ID?.trim())}
      />
    </div>
  )
}

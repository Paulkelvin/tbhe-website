import { NextResponse } from "next/server"
import { WebhooksHelper } from "square"

import { SITE_URL } from "@/lib/content"
import { recordSquarePayment } from "@/lib/payments"

// Must match the notification URL registered in the Square Developer Dashboard exactly, or every signature check fails.
const NOTIFICATION_URL = process.env.SQUARE_WEBHOOK_URL?.trim() || `${SITE_URL}/api/square/webhook`

export async function POST(request: Request) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY?.trim()
  if (!signatureKey) {
    console.error("[square-webhook] SQUARE_WEBHOOK_SIGNATURE_KEY is not set")
    return NextResponse.json({ error: "Not configured" }, { status: 503 })
  }

  const body = await request.text()
  const valid = await WebhooksHelper.verifySignature({
    requestBody: body,
    signatureHeader: request.headers.get("x-square-hmacsha256-signature") ?? "",
    signatureKey,
    notificationUrl: NOTIFICATION_URL,
  })
  if (!valid) return NextResponse.json({ error: "Invalid signature" }, { status: 401 })

  const event = JSON.parse(body) as {
    type?: string
    data?: { id?: string; object?: { refund?: { payment_id?: string } } }
  }
  const paymentId = event.type?.startsWith("refund.")
    ? event.data?.object?.refund?.payment_id
    : event.type?.startsWith("payment.")
      ? event.data?.id
      : undefined

  if (paymentId) {
    try {
      await recordSquarePayment(paymentId, { sendEmails: true })
    } catch (error) {
      console.error("[square-webhook] failed to record payment", paymentId, error)
      // A non-2xx makes Square retry the delivery later.
      return NextResponse.json({ error: "Failed to record" }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}

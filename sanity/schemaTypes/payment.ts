import { defineField, defineType } from "sanity"

// Written by the Square webhook and the admin "Sync from Square" button, not edited by hand.
export default defineType({
  name: "payment",
  title: "Payment",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "squarePaymentId", title: "Square Payment ID", type: "string" }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: { list: ["donation", "monthly-donation", "service"] },
    }),
    defineField({ name: "description", title: "For", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string" }),
    defineField({ name: "amountCents", title: "Amount (cents)", type: "number" }),
    defineField({ name: "refundedCents", title: "Refunded (cents)", type: "number" }),
    defineField({ name: "currency", title: "Currency", type: "string" }),
    defineField({ name: "buyerName", title: "Payer Name", type: "string" }),
    defineField({ name: "buyerEmail", title: "Payer Email", type: "string" }),
    defineField({ name: "cardBrand", title: "Card Brand", type: "string" }),
    defineField({ name: "cardLast4", title: "Card Last 4", type: "string" }),
    defineField({ name: "receiptNumber", title: "Receipt Number", type: "string" }),
    defineField({ name: "receiptUrl", title: "Receipt URL", type: "url" }),
    defineField({ name: "orderId", title: "Square Order ID", type: "string" }),
    defineField({ name: "paidAt", title: "Paid At", type: "datetime" }),
    defineField({ name: "emailsSentAt", title: "Emails Sent At", type: "datetime" }),
  ],
  orderings: [{ title: "Newest first", name: "paidAtDesc", by: [{ field: "paidAt", direction: "desc" }] }],
  preview: {
    select: { title: "description", subtitle: "buyerName", amount: "amountCents" },
    prepare: ({ title, subtitle, amount }) => ({
      title: `${typeof amount === "number" ? `$${(amount / 100).toFixed(2)} · ` : ""}${title ?? "Payment"}`,
      subtitle,
    }),
  },
})

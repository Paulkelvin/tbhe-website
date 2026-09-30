"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowSquareOut,
  CheckCircle,
  Clock,
  DownloadSimple,
  MagnifyingGlass,
  XCircle,
} from "@phosphor-icons/react/dist/ssr"

import { adminSyncPayments } from "@/app/admin/actions"
import { cn } from "@/lib/utils"
import type { PaymentKind, PaymentRecord } from "@/lib/payments"

const KIND_LABELS: Record<PaymentKind, string> = {
  donation: "Donation",
  "monthly-donation": "Monthly donation",
  service: "Coaching & services",
}

// Validated pair (light surface): purple = coaching & services, green = donations.
const SERIES = {
  services: { label: "Coaching & services", color: "#763d8e" },
  donations: { label: "Donations", color: "#6f9a2e" },
}

type Range = "30d" | "12m" | "all"
type KindFilter = "all" | "donations" | PaymentKind

const RANGES: { key: Range; label: string }[] = [
  { key: "30d", label: "Last 30 days" },
  { key: "12m", label: "Last 12 months" },
  { key: "all", label: "All time" },
]

const KIND_FILTERS: { key: KindFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "donations", label: "Donations" },
  { key: "monthly-donation", label: "Monthly" },
  { key: "service", label: "Coaching & services" },
]

// Rounds the chart's top value up to 1, 2, 2.5 or 5 × a power of ten so the axis ticks land on round amounts.
function niceCeiling(cents: number) {
  const dollars = Math.max(cents / 100, 10)
  const magnitude = 10 ** Math.floor(Math.log10(dollars))
  const step = [1, 2, 2.5, 5, 10].find((m) => m * magnitude >= dollars)! * magnitude
  return step * 100
}

function money(cents: number, opts: { compact?: boolean } = {}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: opts.compact || cents % 100 === 0 ? 0 : 2,
    notation: opts.compact && cents >= 100_000 ? "compact" : "standard",
  }).format(cents / 100)
}

function netCents(p: PaymentRecord) {
  return p.status === "COMPLETED" ? Math.max(0, p.amountCents - (p.refundedCents ?? 0)) : 0
}

function isDonation(kind: PaymentKind) {
  return kind === "donation" || kind === "monthly-donation"
}

function StatusBadge({ payment }: { payment: PaymentRecord }) {
  const refunded = payment.refundedCents ?? 0
  const [label, Icon, tone] =
    payment.status === "COMPLETED" && refunded >= payment.amountCents && refunded > 0
      ? (["Refunded", ArrowCounterClockwise, "bg-surface-strong text-body"] as const)
      : payment.status === "COMPLETED" && refunded > 0
        ? (["Partly refunded", ArrowCounterClockwise, "bg-amber-50 text-amber-800"] as const)
        : payment.status === "COMPLETED"
          ? (["Paid", CheckCircle, "bg-emerald-50 text-emerald-800"] as const)
          : payment.status === "FAILED" || payment.status === "CANCELED"
            ? (["Failed", XCircle, "bg-red-50 text-red-800"] as const)
            : (["Pending", Clock, "bg-amber-50 text-amber-800"] as const)
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", tone)}>
      <Icon size={13} weight="fill" />
      {label}
    </span>
  )
}

function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface-card p-5">
      <p className="text-xs font-semibold tracking-wide text-muted-ink uppercase">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink tabular-nums">{value}</p>
      {sub ? <p className="mt-1 text-xs text-muted-ink">{sub}</p> : null}
    </div>
  )
}

function MonthlyChart({ payments }: { payments: PaymentRecord[] }) {
  const [hover, setHover] = useState<number | null>(null)

  const months = useMemo(() => {
    const now = new Date()
    const list = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
      return { key: `${d.getFullYear()}-${d.getMonth()}`, date: d, donations: 0, services: 0 }
    })
    const byKey = new Map(list.map((m) => [m.key, m]))
    for (const p of payments) {
      const d = new Date(p.paidAt)
      const m = byKey.get(`${d.getFullYear()}-${d.getMonth()}`)
      if (!m) continue
      if (isDonation(p.kind)) m.donations += netCents(p)
      else m.services += netCents(p)
    }
    return list
  }, [payments])

  const niceMax = niceCeiling(Math.max(...months.map((m) => m.donations + m.services), 1))
  const active = hover === null ? null : months[hover]

  return (
    <div className="rounded-2xl border border-hairline bg-surface-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">Money received by month</p>
          <p className="text-xs text-muted-ink">Last 12 months, after refunds</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-body">
          {Object.values(SERIES).map((s) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm" style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex h-48 gap-2 pl-12">
        {[1, 0.5, 0].map((f) => (
          <div
            key={f}
            className="pointer-events-none absolute right-0 left-12 border-t border-hairline-soft"
            style={{ bottom: `${f * 100}%` }}
          >
            <span className="absolute -top-2 right-full mr-2 text-[10px] text-muted-ink tabular-nums">
              {money(niceMax * f, { compact: true })}
            </span>
          </div>
        ))}

        {months.map((m, i) => {
          const total = m.donations + m.services
          return (
            <button
              key={m.key}
              type="button"
              aria-label={`${m.date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}: ${money(total)}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="relative flex h-full flex-1 flex-col justify-end outline-none"
            >
              <span
                className={cn("flex w-full flex-col-reverse gap-[2px] transition-opacity", hover !== null && hover !== i && "opacity-40")}
                style={{ height: `${(total / niceMax) * 100}%` }}
              >
                {m.donations > 0 ? (
                  <span
                    className="w-full rounded-t-[4px]"
                    style={{ background: SERIES.donations.color, flexGrow: m.donations, minHeight: 2 }}
                  />
                ) : null}
                {m.services > 0 ? (
                  <span
                    className="w-full rounded-t-[4px]"
                    style={{ background: SERIES.services.color, flexGrow: m.services, minHeight: 2 }}
                  />
                ) : null}
              </span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-ink">
                {m.date.toLocaleDateString("en-US", { month: "short" }).slice(0, 3)}
              </span>
            </button>
          )
        })}

        {active ? (
          <div
            className={cn(
              "pointer-events-none absolute -top-2 z-10 w-48 rounded-xl border border-hairline bg-surface-card p-3 text-xs shadow-lg",
              hover! <= 1 ? "translate-x-0" : hover! >= 10 ? "-translate-x-full" : "-translate-x-1/2"
            )}
            style={{ left: `calc(3rem + (100% - 3rem) * ${(hover! + 0.5) / 12})` }}
          >
            <p className="font-semibold text-ink">
              {active.date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <p className="mt-1.5 flex justify-between gap-2 text-body">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm" style={{ background: SERIES.donations.color }} />
                Donations
              </span>
              <span className="tabular-nums">{money(active.donations)}</span>
            </p>
            <p className="mt-1 flex justify-between gap-2 text-body">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm" style={{ background: SERIES.services.color }} />
                Coaching & services
              </span>
              <span className="tabular-nums">{money(active.services)}</span>
            </p>
            <p className="mt-1.5 flex justify-between border-t border-hairline pt-1.5 font-semibold text-ink">
              <span>Total</span>
              <span className="tabular-nums">{money(active.donations + active.services)}</span>
            </p>
          </div>
        ) : null}
      </div>
      <div className="h-6" />
    </div>
  )
}

function toCsv(rows: PaymentRecord[]) {
  const header = ["Date", "Name", "Email", "Type", "For", "Amount", "Refunded", "Status", "Receipt number", "Receipt URL"]
  const esc = (v: string | number | undefined) => `"${String(v ?? "").replace(/"/g, '""')}"`
  return [
    header.map(esc).join(","),
    ...rows.map((p) =>
      [
        new Date(p.paidAt).toISOString().slice(0, 10),
        p.buyerName,
        p.buyerEmail,
        KIND_LABELS[p.kind],
        p.description,
        (p.amountCents / 100).toFixed(2),
        ((p.refundedCents ?? 0) / 100).toFixed(2),
        p.status,
        p.receiptNumber,
        p.receiptUrl,
      ]
        .map(esc)
        .join(",")
    ),
  ].join("\n")
}

export function PaymentsDashboard({
  payments,
  webhookConfigured,
  squareConfigured,
}: {
  payments: PaymentRecord[]
  webhookConfigured: boolean
  squareConfigured: boolean
}) {
  const router = useRouter()
  const [range, setRange] = useState<Range>("12m")
  const [kind, setKind] = useState<KindFilter>("all")
  const [query, setQuery] = useState("")
  const [shown, setShown] = useState(25)
  const [syncing, startSync] = useTransition()
  const [syncMessage, setSyncMessage] = useState<string | null>(null)

  const inRange = useMemo(() => {
    if (range === "all") return payments
    const days = range === "30d" ? 30 : 365
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
    return payments.filter((p) => new Date(p.paidAt).getTime() >= cutoff)
  }, [payments, range])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return inRange.filter((p) => {
      if (kind === "donations" && !isDonation(p.kind)) return false
      if (kind !== "all" && kind !== "donations" && p.kind !== kind) return false
      if (!q) return true
      return [p.buyerName, p.buyerEmail, p.description, p.receiptNumber].some((v) => v?.toLowerCase().includes(q))
    })
  }, [inRange, kind, query])

  const stats = useMemo(() => {
    const paid = inRange.filter((p) => netCents(p) > 0)
    const donations = paid.filter((p) => isDonation(p.kind))
    const services = paid.filter((p) => !isDonation(p.kind))
    const sum = (list: PaymentRecord[]) => list.reduce((t, p) => t + netCents(p), 0)
    const monthlyCutoff = Date.now() - 35 * 24 * 60 * 60 * 1000
    const monthlyDonors = new Set(
      payments
        .filter((p) => p.kind === "monthly-donation" && netCents(p) > 0 && new Date(p.paidAt).getTime() >= monthlyCutoff)
        .map((p) => p.buyerEmail ?? p._id)
    )
    return {
      total: sum(paid),
      count: paid.length,
      donations: sum(donations),
      donationCount: donations.length,
      services: sum(services),
      serviceCount: services.length,
      monthlyDonors: monthlyDonors.size,
    }
  }, [inRange, payments])

  function sync() {
    setSyncMessage(null)
    startSync(async () => {
      const result = await adminSyncPayments()
      setSyncMessage(result.ok ? (result.count ? `Synced ${result.count} new or updated payment${result.count === 1 ? "" : "s"} from Square.` : "Everything is already up to date.") : result.error)
      router.refresh()
    })
  }

  function exportCsv() {
    const url = URL.createObjectURL(new Blob([toCsv(visible)], { type: "text/csv" }))
    const a = document.createElement("a")
    a.href = url
    a.download = `tbhe-payments-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const rangeLabel = RANGES.find((r) => r.key === range)!.label.toLowerCase()

  return (
    <div className="flex flex-col gap-6">
      {!webhookConfigured || !squareConfigured ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <p className="font-semibold">Finish setup to record payments automatically</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            {!squareConfigured ? <li>Set SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID in Vercel.</li> : null}
            {!webhookConfigured ? (
              <li>
                In the Square Developer Dashboard, add a webhook subscription for{" "}
                <code className="rounded bg-amber-100 px-1 break-all">https://www.tbheducator.com/api/square/webhook</code> with the
                payment.created, payment.updated and refund.updated events, then copy its signature key into Vercel as{" "}
                <code className="rounded bg-amber-100 px-1 break-all">SQUARE_WEBHOOK_SIGNATURE_KEY</code> and redeploy.
              </li>
            ) : null}
          </ol>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 overflow-x-auto rounded-full border border-hairline bg-surface-card p-1">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRange(r.key)}
              aria-pressed={range === r.key}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
                range === r.key ? "bg-primary text-canvas" : "text-body hover:text-ink"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={sync}
          disabled={syncing}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-hairline-strong bg-surface-card px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-primary disabled:opacity-60"
        >
          <ArrowClockwise size={14} className={cn(syncing && "animate-spin")} />
          {syncing ? "Syncing…" : "Sync from Square"}
        </button>
      </div>
      {syncMessage ? <p className="-mt-3 text-xs text-muted-ink">{syncMessage}</p> : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Total received" value={money(stats.total)} sub={`${stats.count} payment${stats.count === 1 ? "" : "s"}, ${rangeLabel}`} />
        <StatTile label="Donations" value={money(stats.donations)} sub={`${stats.donationCount} gift${stats.donationCount === 1 ? "" : "s"}`} />
        <StatTile label="Coaching & services" value={money(stats.services)} sub={`${stats.serviceCount} payment${stats.serviceCount === 1 ? "" : "s"}`} />
        <StatTile label="Monthly donors" value={String(stats.monthlyDonors)} sub="Paid in the last 35 days" />
      </div>

      <MonthlyChart payments={payments} />

      <div className="rounded-2xl border border-hairline bg-surface-card">
        <div className="flex flex-col gap-3 border-b border-hairline p-4 sm:flex-row sm:items-center">
          <div className="flex gap-1 overflow-x-auto">
            {KIND_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setKind(f.key)}
                aria-pressed={kind === f.key}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
                  kind === f.key ? "bg-lavender-surface text-primary" : "text-body hover:text-ink"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:ml-auto">
            <label className="relative flex-1 sm:w-56 sm:flex-none">
              <MagnifyingGlass size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-ink" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, receipt"
                aria-label="Search payments"
                className="w-full min-w-0 rounded-full border border-hairline-strong bg-canvas py-1.5 pr-3 pl-8 text-sm text-ink outline-none focus:border-primary"
              />
            </label>
            <button
              type="button"
              onClick={exportCsv}
              disabled={visible.length === 0}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline-strong px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-primary disabled:opacity-50"
            >
              <DownloadSimple size={14} />
              CSV
            </button>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="text-sm font-semibold text-ink">No payments to show</p>
            <p className="mx-auto mt-1 max-w-sm text-xs text-muted-ink">
              {payments.length === 0
                ? "New payments appear here automatically. Use “Sync from Square” to bring in anything paid before this was set up."
                : "Try a different time range, type or search."}
            </p>
          </div>
        ) : (
          <>
            <table className="hidden w-full text-left text-sm md:table">
              <thead>
                <tr className="text-xs text-muted-ink">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Payer</th>
                  <th className="px-4 py-3 font-semibold">For</th>
                  <th className="px-4 py-3 text-right font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3"><span className="sr-only">Receipt</span></th>
                </tr>
              </thead>
              <tbody>
                {visible.slice(0, shown).map((p) => (
                  <tr key={p._id} className="border-t border-hairline-soft align-top hover:bg-canvas/60">
                    <td className="px-4 py-3 whitespace-nowrap text-body">
                      {new Date(p.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="max-w-48 px-4 py-3">
                      <p className="truncate font-medium text-ink">{p.buyerName ?? "—"}</p>
                      <p className="truncate text-xs text-muted-ink">{p.buyerEmail}</p>
                    </td>
                    <td className="max-w-56 px-4 py-3">
                      <p className="truncate text-ink">{p.description}</p>
                      <p className="text-xs text-muted-ink">{KIND_LABELS[p.kind]}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold whitespace-nowrap text-ink tabular-nums">
                      {money(p.amountCents)}
                    </td>
                    <td className="px-4 py-3"><StatusBadge payment={p} /></td>
                    <td className="px-4 py-3 text-right">
                      {p.receiptUrl ? (
                        <a href={p.receiptUrl} target="_blank" rel="noreferrer noopener" aria-label="Open Square receipt" className="inline-flex text-muted-ink hover:text-primary">
                          <ArrowSquareOut size={16} />
                        </a>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="divide-y divide-hairline-soft md:hidden">
              {visible.slice(0, shown).map((p) => (
                <li key={p._id} className="flex items-start justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{p.buyerName ?? p.buyerEmail ?? "—"}</p>
                    <p className="truncate text-xs text-body">{p.description}</p>
                    <p className="mt-1 text-xs text-muted-ink">
                      {new Date(p.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ·{" "}
                      {KIND_LABELS[p.kind]}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <p className="text-sm font-semibold text-ink tabular-nums">{money(p.amountCents)}</p>
                    <StatusBadge payment={p} />
                    {p.receiptUrl ? (
                      <a href={p.receiptUrl} target="_blank" rel="noreferrer noopener" className="text-xs font-semibold text-primary">
                        Receipt
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>

            {visible.length > shown ? (
              <div className="border-t border-hairline-soft p-3 text-center">
                <button
                  type="button"
                  onClick={() => setShown((n) => n + 25)}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold text-primary hover:bg-lavender-surface"
                >
                  Show more ({visible.length - shown} more)
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

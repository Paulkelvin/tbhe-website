"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PRESET_AMOUNTS = [10, 20, 30, 100, 250, 500]

export function DonateForm() {
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState("")

  const customValue = Number(custom)
  const hasCustom = custom.trim().length > 0
  const amount = hasCustom
    ? Number.isFinite(customValue) && customValue > 0
      ? Math.round(customValue)
      : null
    : selected

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {PRESET_AMOUNTS.map((value) => {
          const active = !hasCustom && selected === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                setSelected(value)
                setCustom("")
              }}
              className={cn(
                "rounded-xl border-2 px-3 py-3 text-center text-lg font-semibold transition-colors",
                active
                  ? "border-arm-mission bg-arm-mission/10 text-arm-mission-ink"
                  : "border-hairline-strong text-ink hover:border-arm-mission/50"
              )}
            >
              ${value}
            </button>
          )
        })}
      </div>

      <label className="mt-4 flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-body-strong">
          Or enter a custom amount
        </span>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-body">
            $
          </span>
          <input
            type="number"
            min={1}
            step={1}
            inputMode="decimal"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value)
              setSelected(null)
            }}
            placeholder="Other amount"
            className="w-full rounded-lg border border-hairline-strong bg-canvas py-2.5 pr-3.5 pl-7 text-base text-ink outline-none focus:border-arm-mission"
          />
        </div>
      </label>

      {amount ? (
        <Button
          asChild
          size="lg"
          className="mt-6 w-full bg-arm-mission text-arm-mission-ink hover:bg-arm-mission/85 sm:w-fit"
        >
          <a href={`/api/donate?amount=${amount}`}>Donate ${amount} Now</a>
        </Button>
      ) : (
        <Button
          size="lg"
          disabled
          className="mt-6 w-full bg-arm-mission text-arm-mission-ink sm:w-fit"
        >
          Donate Now
        </Button>
      )}

      <p className="caption mt-4 text-muted-ink">
        Mission 139 is a 501(c)(3) nonprofit organization. Your donation is
        tax-deductible to the fullest extent allowed by law.
      </p>
    </div>
  )
}

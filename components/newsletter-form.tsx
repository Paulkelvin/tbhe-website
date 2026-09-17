"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-sm font-medium text-arm-mission-ink">
        You&apos;re on the list — thanks for subscribing.
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        placeholder="you@school.org"
        aria-label="Email address"
        className="w-full rounded-full border border-hairline-strong bg-surface-card px-4 py-2 text-sm text-ink placeholder:text-muted-soft focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />
      <Button type="submit" className="shrink-0">
        Subscribe
      </Button>
    </form>
  )
}

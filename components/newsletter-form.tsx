"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(false)

    const data = Object.fromEntries(new FormData(event.currentTarget))

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Request failed")
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <p className="text-body-sm font-medium text-arm-mission-ink">
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
        name="email"
        required
        placeholder="you@school.org"
        aria-label="Email address"
        className="w-full rounded-full border border-hairline-strong bg-surface-card px-4 py-2 text-sm text-ink placeholder:text-muted-soft focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />
      <Button type="submit" disabled={submitting} className="shrink-0">
        {submitting ? "Subscribing…" : "Subscribe"}
      </Button>
      {error ? (
        <p className="text-sm text-red-700 sm:basis-full">
          Something went wrong — please try again.
        </p>
      ) : null}
    </form>
  )
}

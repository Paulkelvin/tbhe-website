"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"

export function SpeakerBookingForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(false)

    const data = Object.fromEntries(new FormData(event.currentTarget))

    try {
      const response = await fetch("/api/speaker-booking", {
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
      <div className="rounded-2xl border border-hairline bg-surface-card p-8 text-center">
        <p className="text-h3 text-ink">Request received.</p>
        <p className="text-body-sm mt-2 text-body">
          Thanks for the booking request. Expect a reply with availability
          and next steps soon.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-hairline bg-surface-card p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="speaker-name">
          <input id="speaker-name" name="name" required className="form-input" />
        </Field>
        <Field label="Email" htmlFor="speaker-email">
          <input
            id="speaker-email"
            name="email"
            type="email"
            required
            className="form-input"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Organization / event name" htmlFor="speaker-org">
          <input id="speaker-org" name="org" required className="form-input" />
        </Field>
        <Field label="Preferred event date" htmlFor="speaker-date">
          <input
            id="speaker-date"
            name="eventDate"
            type="date"
            className="form-input"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Topic or focus area" htmlFor="speaker-topic">
          <input
            id="speaker-topic"
            name="topic"
            required
            placeholder="e.g. Inclusive classrooms, teacher retention"
            className="form-input"
          />
        </Field>
        <Field label="Estimated audience size" htmlFor="speaker-audience">
          <input id="speaker-audience" name="audienceSize" className="form-input" />
        </Field>
      </div>

      <Field label="Anything else we should know?" htmlFor="speaker-message">
        <textarea
          id="speaker-message"
          name="message"
          rows={4}
          className="form-input resize-none"
        />
      </Field>

      {error ? (
        <p className="text-body-sm text-red-700">
          Something went wrong sending your request. Please try again, or
          email us directly.
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="justify-self-start"
      >
        {submitting ? "Sending…" : "Request booking"}
      </Button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-1.5">
      <span className="caption text-ink">{label}</span>
      {children}
    </label>
  )
}

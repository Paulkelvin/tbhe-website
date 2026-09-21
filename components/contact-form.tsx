"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"

const REASONS = [
  "Consulting & professional development",
  "Mission 139 family assistance",
  "Advocacy / IEP & 504 support",
  "Donation or corporate sponsorship",
  "Media, speaking, or press",
  "Something else",
] as const

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(false)

    const data = Object.fromEntries(new FormData(event.currentTarget))

    try {
      const response = await fetch("/api/contact", {
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
        <p className="text-h3 text-ink">Thank you for reaching out.</p>
        <p className="text-body-sm mt-2 text-body">
          Your message has been received. Someone from the TBHE team will
          follow up soon.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-hairline bg-surface-card p-8 shadow-[0_30px_60px_-38px_rgba(37,24,39,0.3)] sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          htmlFor="name"
          hint="Start here."
        >
          <input
            id="name"
            name="name"
            required
            className="form-input"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            className="form-input"
          />
        </Field>
      </div>

      <Field label="Organization (optional)" htmlFor="org">
        <input id="org" name="org" className="form-input" />
      </Field>

      <Field label="What are you reaching out about?" htmlFor="reason">
        <select id="reason" name="reason" required defaultValue="" className="form-input">
          <option value="" disabled>
            Select a reason
          </option>
          {REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="form-input resize-none"
        />
      </Field>

      {error ? (
        <p className="text-body-sm text-red-700">
          Something went wrong sending your message. Please try again, or
          email us directly.
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="justify-self-start"
      >
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-1.5">
      <span className="flex items-baseline gap-2">
        <span className="caption text-ink">{label}</span>
        {hint ? (
          <span className="text-quote text-[0.9375rem] text-primary/70">
            {hint}
          </span>
        ) : null}
      </span>
      {children}
    </label>
  )
}

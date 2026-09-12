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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-hairline bg-surface-card p-8 text-center">
        <p className="text-lg font-semibold text-ink">Thank you for reaching out.</p>
        <p className="mt-2 text-sm text-body">
          Your message has been received. Someone from the TBHE team will
          follow up soon.
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
        <Field label="Full name" htmlFor="name">
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

      <Button type="submit" size="lg" className="justify-self-start">
        Send message
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
    <label htmlFor={htmlFor} className="grid gap-1.5 text-sm">
      <span className="font-medium text-ink">{label}</span>
      {children}
    </label>
  )
}

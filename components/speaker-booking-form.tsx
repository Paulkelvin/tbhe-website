"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { KEYNOTE_TOPICS } from "@/lib/content"

export function SpeakerBookingForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-hairline bg-surface-card p-8 text-center">
        <p className="text-lg font-semibold text-ink">Request received.</p>
        <p className="mt-2 text-sm text-body">
          Thanks for the booking request — expect a reply with availability
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
        <Field label="Keynote topic" htmlFor="speaker-topic">
          <select
            id="speaker-topic"
            name="topic"
            required
            defaultValue=""
            className="form-input"
          >
            <option value="" disabled>
              Select a topic
            </option>
            {KEYNOTE_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
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

      <Button type="submit" size="lg" className="justify-self-start">
        Request booking
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

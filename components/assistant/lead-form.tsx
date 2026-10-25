"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowLeft, CheckCircle, EnvelopeSimple } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { HoneypotField } from "@/components/honeypot-field"
import {
  INQUIRY_OPTIONS,
  ROLE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/assistant/inquiry"
import { BUSINESS_CONTACT } from "@/lib/content"

export function LeadForm({
  onBack,
  page,
}: {
  onBack: () => void
  page: string
}) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<{ code: string; message: string } | null>(
    null
  )
  const [sent, setSent] = useState<{ acknowledgmentSent: boolean } | null>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const form = new FormData(event.currentTarget)
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      role: form.get("role"),
      inquiry: form.get("inquiry"),
      location: form.get("location"),
      timeline: form.get("timeline"),
      message: form.get("message"),
      page,
      consent: form.get("consent") === "on",
      website: form.get("website"),
    }

    try {
      const response = await fetch("/api/assistant/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await response.json().catch(() => null)) as {
        acknowledgmentSent?: boolean
        error?: string
        message?: string
      } | null

      if (!response.ok) {
        setError({
          code: data?.error ?? "error",
          message:
            data?.message ??
            "We couldn't send your message just now. Please try again, or email us directly.",
        })
        return
      }

      setSent({ acknowledgmentSent: Boolean(data?.acknowledgmentSent) })
    } catch {
      setError({
        code: "error",
        message:
          "We couldn't reach the server. Please check your connection and try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-arm-mission/15 text-arm-mission-ink">
          <CheckCircle size={30} weight="fill" />
        </span>
        <div>
          <h3
            ref={successRef}
            tabIndex={-1}
            className="text-h3 text-ink focus:outline-none"
          >
            Your message is with our team.
          </h3>
          <p className="text-body-sm mt-2 max-w-xs text-body">
            Thank you for trusting us with this. A member of the team will
            review your note and follow up by email.
            {sent.acknowledgmentSent
              ? " A confirmation email is on its way to your inbox."
              : ""}
          </p>
        </div>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            <ArrowLeft size={16} />
            Back to the conversation
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/contact">Visit the Contact page</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-6"
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 rounded-md text-xs font-semibold text-muted-ink transition-colors hover:text-ink focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <ArrowLeft size={14} />
        Back to the conversation
      </button>

      <p className="eyebrow text-primary">Connect with our team</p>
      <h3 className="text-h3 mt-1.5 text-ink">Tell us a little about you</h3>
      <p className="text-body-sm mt-1.5 text-body">
        We&apos;ll route your note to the right person — no need to know which
        organization to choose.
      </p>

      <HoneypotField />

      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="assistant-name" required>
            <input
              id="assistant-name"
              name="name"
              required
              autoComplete="name"
              className="form-input"
            />
          </Field>
          <Field label="Email" htmlFor="assistant-email" required>
            <input
              id="assistant-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="form-input"
            />
          </Field>
        </div>

        <Field label="I am a…" htmlFor="assistant-role">
          <select
            id="assistant-role"
            name="role"
            className="form-input"
            defaultValue=""
          >
            <option value="" disabled>
              Select one
            </option>
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="I'm reaching out about"
          htmlFor="assistant-inquiry"
          required
        >
          <select
            id="assistant-inquiry"
            name="inquiry"
            required
            className="form-input"
            defaultValue=""
          >
            <option value="" disabled>
              Select a topic
            </option>
            {INQUIRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City and state" htmlFor="assistant-location">
            <input
              id="assistant-location"
              name="location"
              placeholder="e.g. Bowie, MD"
              autoComplete="address-level2"
              className="form-input"
            />
          </Field>
          <Field label="Timeline" htmlFor="assistant-timeline">
            <select
              id="assistant-timeline"
              name="timeline"
              className="form-input"
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              {TIMELINE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="How can we help?" htmlFor="assistant-message">
          <textarea
            id="assistant-message"
            name="message"
            rows={4}
            className="form-input resize-none"
            placeholder="Share what's going on and what kind of support you're looking for."
          />
        </Field>

        <p className="text-xs leading-relaxed text-muted-ink">
          Please don&apos;t include medical records, IEP documents, or your
          child&apos;s full name. If the team needs more, they&apos;ll ask
          privately.
        </p>

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-body">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 size-4 shrink-0 rounded border-hairline-strong accent-primary"
          />
          <span>
            It&apos;s okay to email me about this inquiry. I&apos;ve read the{" "}
            <Link
              href="/privacy"
              className="font-semibold text-primary underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-error/25 bg-error/5 p-3 text-xs leading-relaxed text-body"
          >
            <p>{error.message}</p>
            {error.code === "not_configured" ? (
              <a
                href={`mailto:${BUSINESS_CONTACT.email}`}
                className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-primary underline underline-offset-2"
              >
                <EnvelopeSimple size={14} />
                Email {BUSINESS_CONTACT.email}
              </a>
            ) : null}
          </div>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full"
        >
          {submitting ? "Sending…" : "Send to the team"}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-1.5">
      <span className="caption text-ink">
        {label}
        {required ? (
          <span aria-hidden className="ml-0.5 text-primary">
            *
          </span>
        ) : null}
      </span>
      {children}
    </label>
  )
}

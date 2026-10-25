"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowLeft, CheckCircle, EnvelopeSimple } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { HoneypotField } from "@/components/honeypot-field"
import { INQUIRY_OPTIONS } from "@/lib/assistant/inquiry"
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
      inquiry: form.get("inquiry"),
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
        className="mb-4 inline-flex items-center gap-1.5 rounded-md py-1 text-xs font-semibold text-muted-ink transition-colors hover:text-ink focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      <h3 className="text-h3 text-ink">Talk with our team</h3>
      <p className="text-body-sm mt-1.5 text-body">
        Share a few details and we&apos;ll route your note to the right person.
      </p>

      <HoneypotField />

      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" htmlFor="assistant-name" required>
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

        <Field
          label="What can we help with?"
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

        <Field label="Message" htmlFor="assistant-message">
          <textarea
            id="assistant-message"
            name="message"
            rows={3}
            className="form-input resize-none"
            placeholder="What's going on?"
          />
        </Field>

        <p className="text-xs leading-relaxed text-muted-ink">
          Please don&apos;t include medical records, IEP documents, or your
          child&apos;s full name.
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

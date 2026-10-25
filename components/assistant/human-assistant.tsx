"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  ArrowCounterClockwise,
  ArrowRight,
  Buildings,
  Compass,
  HandHeart,
  Heart,
  Microphone,
  PaperPlaneRight,
  ShieldCheck,
  Sparkle,
  Stop,
  Student,
  WarningCircle,
  X,
} from "@phosphor-icons/react"

import { AssistantText } from "@/components/assistant/assistant-message"
import { LeadForm } from "@/components/assistant/lead-form"
import { Button } from "@/components/ui/button"
import {
  ASSISTANT_EXPANSION,
  ASSISTANT_NAME,
  GREETING,
  PATHWAYS,
} from "@/lib/assistant/paths"
import { BUSINESS_CONTACT } from "@/lib/content"
import { cn } from "@/lib/utils"

const EASE = [0.4, 0, 0.2, 1] as const
const MAX_INPUT = 1500

const PATHWAY_ICONS = {
  HandHeart,
  Student,
  Buildings,
  Microphone,
  Heart,
  Compass,
} as const

type ChatMessage = { id: string; role: "user" | "assistant"; content: string }
type AssistantError = { code: string; message: string }

export function HumanAssistant() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  const [open, setOpen] = useState(false)
  const [view, setView] = useState<"chat" | "lead">("chat")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [streamText, setStreamText] = useState("")
  const [error, setError] = useState<AssistantError | null>(null)
  const [unavailable, setUnavailable] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const [stickToBottom, setStickToBottom] = useState(true)

  const panelRef = useRef<HTMLDivElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const streamRef = useRef("")
  const resetRef = useRef(false)
  const idRef = useRef(0)

  function nextId() {
    idRef.current += 1
    return `human-${idRef.current}`
  }

  const closePanel = useCallback(() => {
    abortRef.current?.abort()
    setOpen(false)
    setView("chat")
    window.requestAnimationFrame(() => launcherRef.current?.focus())
  }, [])

  // Escape closes the dialog even when focus has landed on an element that
  // was just unmounted (for example after the lead form switches to its
  // success state).
  useEffect(() => {
    if (!open) return
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation()
        closePanel()
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, closePanel])

  function openPanel() {
    setOpen(true)
    setStickToBottom(true)
  }

  function startOver() {
    resetRef.current = true
    abortRef.current?.abort()
    setMessages([])
    setInput("")
    setStreamText("")
    setStreaming(false)
    setError(null)
    setUnavailable(false)
    setView("chat")
    setAnnouncement("Conversation started over.")
    window.setTimeout(() => inputRef.current?.focus(), 60)
  }

  // Close the widget when a link inside it moves the visitor to a new page,
  // so it never covers the page they just asked to see.
  useEffect(() => {
    abortRef.current?.abort()
    setOpen(false)
    setView("chat")
  }, [pathname])

  // Lock background scroll and restore focus when the dialog closes.
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = overflow
      if (
        panelRef.current?.contains(document.activeElement) ||
        document.activeElement === document.body
      ) {
        previous?.focus?.()
      }
    }
  }, [open])

  // Move focus into the dialog once it is on screen. On mobile the composer
  // is deliberately not focused, so the on-screen keyboard doesn't cover the
  // welcome choices.
  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => {
      if (view === "lead") {
        document.getElementById("assistant-name")?.focus()
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        inputRef.current?.focus()
      } else {
        panelRef.current?.focus()
      }
    }, 180)
    return () => window.clearTimeout(timer)
  }, [open, view])

  useEffect(() => {
    const element = inputRef.current
    if (!element) return
    element.style.height = "0px"
    element.style.height = `${Math.min(element.scrollHeight, 112)}px`
  }, [input, open, view])

  useEffect(() => {
    const element = scrollRef.current
    if (!element || view === "lead") return
    // The welcome screen starts at the top; conversations stick to the newest
    // message. Without this, opening the panel on a short viewport scrolled
    // the greeting out of sight before the visitor read it.
    if (messages.length === 0 && !streaming) {
      element.scrollTop = 0
      return
    }
    if (stickToBottom) element.scrollTop = element.scrollHeight
  }, [messages, streamText, view, open, stickToBottom, streaming])

  async function runReply(history: ChatMessage[]) {
    resetRef.current = false
    setStreaming(true)
    setStreamText("")
    setError(null)
    setStickToBottom(true)
    setAnnouncement(`${ASSISTANT_NAME} is typing.`)
    streamRef.current = ""

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
          page: pathname,
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string
          message?: string
        } | null
        if (data?.error === "not_configured") setUnavailable(true)
        setError({
          code: data?.error ?? "error",
          message:
            data?.message ??
            "H.U.M.A.N. couldn't reply just now. Please try again in a moment.",
        })
        return
      }

      if (!response.body) throw new Error("No response body")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let full = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        streamRef.current = full
        setStreamText(full)
      }

      full = full.trim()
      if (full) {
        setMessages((current) => [
          ...current,
          { id: nextId(), role: "assistant", content: full },
        ])
        setAnnouncement(full.replace(/[*_#[\]]/g, "").slice(0, 400))
      }
    } catch (caught) {
      if (resetRef.current) return

      if ((caught as Error).name === "AbortError") {
        const partial = streamRef.current.trim()
        if (partial) {
          setMessages((current) => [
            ...current,
            { id: nextId(), role: "assistant", content: partial },
          ])
        }
        return
      }

      setError({
        code: "error",
        message:
          "Something went wrong on our end. Please try again, or reach the team through the Contact page.",
      })
    } finally {
      setStreaming(false)
      setStreamText("")
      streamRef.current = ""
      abortRef.current = null
      setStickToBottom(true)
    }
  }

  function sendMessage(text: string) {
    const content = text.trim().slice(0, MAX_INPUT)
    if (!content || streaming) return

    setInput("")
    const userMessage: ChatMessage = {
      id: nextId(),
      role: "user",
      content,
    }
    const next = [...messages, userMessage]
    setMessages(next)
    setStickToBottom(true)
    void runReply(next)
  }

  function retry() {
    if (messages.length && messages[messages.length - 1].role === "user") {
      void runReply(messages)
    }
  }

  function stopGenerating() {
    abortRef.current?.abort()
  }

  function handlePanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation()
      closePanel()
      return
    }

    if (event.key !== "Tab") return

    const root = panelRef.current
    if (!root) return
    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.getClientRects().length > 0)

    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function handleComposerKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    )
      return
    // Mobile keyboards use Return for new lines; desktop and explicit
    // Ctrl/Cmd+Enter send immediately.
    const desktop = window.matchMedia("(min-width: 640px)").matches
    if (desktop || event.ctrlKey || event.metaKey) {
      event.preventDefault()
      sendMessage(input)
    }
  }

  const latestUserMessage = Boolean(
    messages.length && messages[messages.length - 1].role === "user"
  )

  return (
    <>
      <AnimatePresence>
        {!open ? (
          <motion.button
            key="human-launcher"
            ref={launcherRef}
            type="button"
            onClick={openPanel}
            aria-expanded={open}
            aria-controls="human-assistant-panel"
            aria-label={`Ask ${ASSISTANT_NAME}, the virtual assistant`}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary py-2.5 pr-4 pl-2.5 text-primary-foreground shadow-[0_18px_40px_-12px_rgba(37,24,39,0.55)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none sm:right-6 sm:bottom-6"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
              <Sparkle size={19} weight="fill" />
            </span>
            <span className="text-sm font-semibold tracking-[0.01em]">
              Ask {ASSISTANT_NAME}
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="human-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closePanel}
              aria-hidden
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px] sm:hidden"
            />

            <motion.div
              key="human-panel"
              id="human-assistant-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="human-assistant-title"
              aria-describedby="human-assistant-description"
              tabIndex={-1}
              onKeyDown={handlePanelKeyDown}
              initial={
                reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.985 }
              }
              transition={{ duration: 0.25, ease: EASE }}
              className="fixed inset-x-0 bottom-0 z-[70] flex h-[calc(100dvh-0.5rem)] flex-col overflow-hidden rounded-t-3xl border border-hairline bg-surface-card shadow-[0_40px_90px_-20px_rgba(37,24,39,0.5)] focus:outline-none sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-[min(720px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-3xl"
            >
              <p role="status" aria-live="polite" className="sr-only">
                {announcement}
              </p>

              <header className="relative overflow-hidden bg-[linear-gradient(135deg,#763d8e_0%,#5d2f70_100%)] px-4 py-4 text-primary-foreground sm:px-5">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-8 size-32 rounded-full bg-white/10"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 left-8 size-28 rounded-full bg-white/5"
                />
                <div className="relative flex items-start gap-3">
                  <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                    <Sparkle size={22} weight="fill" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h2
                        id="human-assistant-title"
                        className="font-display text-[1.35rem] leading-none tracking-[0.02em]"
                      >
                        {ASSISTANT_NAME}
                      </h2>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] uppercase">
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-[#a4d15c]"
                        />
                        AI guide
                      </span>
                    </div>
                    <p
                      id="human-assistant-description"
                      className="mt-1 text-xs leading-snug text-white/85"
                    >
                      {ASSISTANT_EXPANSION}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-0.5">
                    {messages.length > 0 ? (
                      <button
                        type="button"
                        onClick={startOver}
                        aria-label="Start a new conversation"
                        title="Start over"
                        className="flex size-11 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
                      >
                        <ArrowCounterClockwise size={18} />
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={closePanel}
                      aria-label="Close the assistant"
                      className="flex size-11 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
                    >
                      <X size={19} />
                    </button>
                  </div>
                </div>
              </header>

              <div className="flex min-h-0 flex-1 flex-col">
                {view === "lead" ? (
                  <LeadForm onBack={() => setView("chat")} page={pathname} />
                ) : (
                  <>
                    <div
                      ref={scrollRef}
                      role="region"
                      aria-label="Conversation"
                      tabIndex={0}
                      onScroll={(event) => {
                        const element = event.currentTarget
                        setStickToBottom(
                          element.scrollHeight -
                            element.scrollTop -
                            element.clientHeight <
                            96
                        )
                      }}
                      className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset focus-visible:outline-none"
                    >
                      {messages.length === 0 ? (
                        <Welcome onPick={sendMessage} />
                      ) : null}

                      <div className="space-y-3.5">
                        {messages.map((message) => (
                          <MessageBubble key={message.id} message={message} />
                        ))}

                        {streaming ? (
                          <StreamingBubble
                            text={streamText}
                            reduceMotion={Boolean(reduceMotion)}
                          />
                        ) : null}

                        {error ? (
                          <ErrorNotice
                            error={error}
                            canRetry={latestUserMessage}
                            onRetry={retry}
                          />
                        ) : null}
                      </div>
                    </div>

                    {unavailable ? (
                      <div className="border-t border-hairline bg-surface-card px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-center">
                        <p className="text-xs text-body">
                          H.U.M.A.N. can&apos;t chat right now, but our team can
                          still help.
                        </p>
                        <div className="mt-2.5 flex flex-wrap justify-center gap-2">
                          <Button asChild size="sm">
                            <Link href="/contact">Contact our team</Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <a href={`mailto:${BUSINESS_CONTACT.email}`}>
                              Email us
                            </a>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-t border-hairline bg-surface-card px-3.5 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4">
                        <form
                          onSubmit={(event) => {
                            event.preventDefault()
                            sendMessage(input)
                          }}
                          className="flex items-end gap-2 rounded-2xl border border-hairline-strong bg-canvas p-1.5 transition-colors focus-within:border-primary/50 focus-within:ring-[3px] focus-within:ring-primary/10"
                        >
                          <label
                            htmlFor="human-assistant-input"
                            className="sr-only"
                          >
                            Message {ASSISTANT_NAME}
                          </label>
                          <textarea
                            id="human-assistant-input"
                            ref={inputRef}
                            rows={1}
                            value={input}
                            maxLength={MAX_INPUT}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={handleComposerKeyDown}
                            placeholder="Ask about support, services, or next steps…"
                            className="max-h-28 min-h-9 w-full flex-1 resize-none bg-transparent px-2.5 py-2 text-base leading-snug text-ink placeholder:text-muted-ink focus:outline-none"
                          />

                          {streaming ? (
                            <button
                              type="button"
                              onClick={stopGenerating}
                              aria-label="Stop generating a reply"
                              className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-hairline-strong bg-surface-card text-ink transition-colors hover:bg-canvas-soft focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                            >
                              <Stop size={15} weight="fill" />
                            </button>
                          ) : (
                            <button
                              type="submit"
                              disabled={!input.trim()}
                              aria-label="Send message"
                              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                            >
                              <PaperPlaneRight size={18} weight="fill" />
                            </button>
                          )}
                        </form>

                        <div className="mt-2 flex items-center justify-between gap-2 px-1">
                          <p className="text-xs leading-tight text-muted-ink">
                            AI assistant · can make mistakes
                          </p>
                          <button
                            type="button"
                            onClick={() => setView("lead")}
                            className="inline-flex shrink-0 items-center gap-1 rounded-md text-xs font-semibold text-primary transition-colors hover:text-primary-active focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                          >
                            Talk with our team
                            <ArrowRight size={12} weight="bold" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function AssistantAvatar() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-lavender text-primary"
    >
      <Sparkle size={15} weight="fill" />
    </span>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[86%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-[0.9375rem] leading-[1.6] whitespace-pre-wrap text-primary-foreground">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2.5">
      <AssistantAvatar />
      <div className="max-w-[calc(100%-2.75rem)] rounded-2xl rounded-tl-md bg-canvas-soft px-3.5 py-2.5 text-[0.9375rem] leading-[1.6] text-ink">
        <AssistantText text={message.content} />
      </div>
    </div>
  )
}

function StreamingBubble({
  text,
  reduceMotion,
}: {
  text: string
  reduceMotion: boolean
}) {
  return (
    <div className="flex gap-2.5">
      <AssistantAvatar />
      <div className="max-w-[calc(100%-2.75rem)] rounded-2xl rounded-tl-md bg-canvas-soft px-3.5 py-2.5 text-[0.9375rem] leading-[1.6] text-ink">
        {text ? (
          <>
            <AssistantText text={text} />
            <span
              aria-hidden
              className={cn(
                "ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary/60",
                !reduceMotion && "animate-pulse"
              )}
            />
          </>
        ) : (
          <span
            className="flex items-center gap-1.5 py-1"
            aria-label="H.U.M.A.N. is typing"
          >
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={cn(
                  "size-1.5 rounded-full bg-muted-ink/60",
                  !reduceMotion && "animate-bounce"
                )}
                style={{ animationDelay: `${dot * 120}ms` }}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  )
}

function ErrorNotice({
  error,
  canRetry,
  onRetry,
}: {
  error: AssistantError
  canRetry: boolean
  onRetry: () => void
}) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-error/25 bg-error/5 p-3 text-xs leading-relaxed text-body"
    >
      <div className="flex gap-2">
        <WarningCircle size={16} className="mt-0.5 shrink-0 text-error" />
        <div>
          <p>{error.message}</p>
          {error.code === "not_configured" ? (
            <p className="mt-1">
              Email{" "}
              <a
                href={`mailto:${BUSINESS_CONTACT.email}`}
                className="font-semibold text-primary underline underline-offset-2"
              >
                {BUSINESS_CONTACT.email}
              </a>{" "}
              or use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary underline underline-offset-2"
              >
                Contact page
              </Link>
              .
            </p>
          ) : null}
          {canRetry && error.code !== "not_configured" ? (
            <button
              type="button"
              onClick={onRetry}
              className="mt-1.5 font-semibold text-primary underline underline-offset-2 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Try again
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function Welcome({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="space-y-3.5">
      <div className="flex gap-2.5">
        <AssistantAvatar />
        <div className="max-w-[calc(100%-2.75rem)] rounded-2xl rounded-tl-md bg-canvas-soft px-3.5 py-2.5 text-[0.9375rem] leading-[1.6] text-ink">
          {GREETING}
        </div>
      </div>

      <div>
        <p className="eyebrow px-1 text-muted-ink">
          Where would you like to start?
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {PATHWAYS.map((pathway) => {
            const Icon = PATHWAY_ICONS[pathway.icon]
            return (
              <button
                key={pathway.id}
                type="button"
                onClick={() => onPick(pathway.prompt)}
                className="group flex min-h-16 items-center gap-2.5 rounded-xl border border-hairline bg-surface-card p-2.5 text-left transition-colors hover:border-primary/40 hover:bg-lavender-surface focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lavender-surface text-primary transition-colors group-hover:bg-white">
                  <Icon size={15} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] leading-tight font-semibold text-ink">
                    {pathway.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted-ink">
                    {pathway.detail}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="flex items-start gap-1.5 px-1 text-xs leading-relaxed text-muted-ink">
        <ShieldCheck size={14} className="mt-0.5 shrink-0" />
        <span>
          An AI guide, not a person. Please don&apos;t share medical records,
          IEP documents, or your child&apos;s full name.{" "}
          <Link
            href="/privacy"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Privacy
          </Link>
        </span>
      </p>
    </div>
  )
}

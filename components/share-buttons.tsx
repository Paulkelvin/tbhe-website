"use client"

import { useState } from "react"
import { Check, FacebookLogo, LinkedinLogo, LinkSimple, XLogo } from "@phosphor-icons/react"

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookLogo,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XLogo,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: LinkedinLogo,
    },
  ]

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable (e.g. no permission) — the other share
      // options still work, so this just silently no-ops.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-body-sm font-semibold text-body">Share this article</span>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={link.label}
            className="flex size-9 items-center justify-center rounded-full border border-hairline-strong text-body transition-colors hover:border-primary hover:text-primary"
          >
            <link.icon size={16} weight="bold" />
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy link"
          className="flex size-9 items-center justify-center rounded-full border border-hairline-strong text-body transition-colors hover:border-primary hover:text-primary"
        >
          {copied ? <Check size={16} weight="bold" /> : <LinkSimple size={16} weight="bold" />}
        </button>
        {copied ? <span className="text-body-sm text-primary">Link copied</span> : null}
      </div>
    </div>
  )
}

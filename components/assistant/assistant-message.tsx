"use client"

import Link from "next/link"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

const linkClass =
  "font-semibold text-primary underline underline-offset-2 hover:text-primary-active"

const components: Components = {
  p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
  a: ({ href = "", children }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={linkClass}>
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        className={linkClass}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {children}
      </a>
    )
  },
  ul: ({ children }) => (
    <ul className="my-2 ml-4 list-disc space-y-1.5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 ml-4 list-decimal space-y-1.5">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-0.5">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  h1: ({ children }) => (
    <p className="mt-3 mb-1 text-[0.9375rem] font-semibold text-ink first:mt-0">
      {children}
    </p>
  ),
  h2: ({ children }) => (
    <p className="mt-3 mb-1 text-[0.9375rem] font-semibold text-ink first:mt-0">
      {children}
    </p>
  ),
  h3: ({ children }) => (
    <p className="mt-3 mb-1 text-[0.9375rem] font-semibold text-ink first:mt-0">
      {children}
    </p>
  ),
  h4: ({ children }) => (
    <p className="mt-3 mb-1 text-[0.9375rem] font-semibold text-ink first:mt-0">
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-hairline-strong pl-3 text-muted-ink">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => (
    <code
      className={
        className
          ? "font-mono text-xs"
          : "rounded bg-ink/[0.06] px-1 py-0.5 font-mono text-[0.85em]"
      }
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-2 overflow-x-auto rounded-lg bg-ink/[0.06] p-3 text-xs leading-relaxed">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto">
      <table className="w-full border-collapse text-left text-xs">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-hairline px-2 py-1 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-hairline/60 px-2 py-1 align-top">
      {children}
    </td>
  ),
  hr: () => <hr className="my-3 border-hairline" />,
}

/**
 * Standard assistant markdown: paragraphs, lists, links, bold/italic, inline
 * code, fenced code, blockquotes and tables. Raw HTML is not rendered.
 */
export function AssistantText({ text }: { text: string }) {
  return (
    <div className="break-words text-[0.9375rem] leading-[1.65] text-ink">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  )
}

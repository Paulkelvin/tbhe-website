import Image from "next/image"
import Link from "next/link"

import { formatPostDate } from "@/lib/blog"
import type { Post } from "@/sanity/queries"

export function BlogCard({ post, headingLevel = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  const date = formatPostDate(post.publishedAt)
  const external = Boolean(post.externalUrl)

  return (
    <Link
      href={post.externalUrl ?? `/blog/${post.slug}`}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group flex flex-col"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-canvas-soft">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${external ? "object-left" : ""}`}
          />
        ) : null}
      </div>
      <div className="mt-5">
        {date ? <p className="eyebrow text-primary">{date}</p> : null}
        <Heading className="text-h3 mt-2 line-clamp-2 text-ink transition-colors group-hover:text-primary">
          {post.title}
        </Heading>
        {post.excerpt ? (
          <p className="text-body-sm mt-2.5 line-clamp-2 text-body">
            {post.excerpt}
          </p>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          {external ? "Read on Substack" : "Read the article"}
          <span className="transition-transform group-hover:translate-x-0.5">
            {external ? "↗" : "→"}
          </span>
        </span>
      </div>
    </Link>
  )
}

import Image from "next/image"
import Link from "next/link"

import { formatPostDate } from "@/lib/blog"
import type { Post } from "@/sanity/queries"

export function BlogCard({ post }: { post: Post }) {
  const date = formatPostDate(post.publishedAt)

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-canvas-soft">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="mt-5">
        {date ? <p className="eyebrow text-primary">{date}</p> : null}
        <h3 className="text-h3 mt-2 text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="text-body-sm mt-2.5 line-clamp-3 text-body">
            {post.excerpt}
          </p>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Read the article
          <span className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}

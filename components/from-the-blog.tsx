import Link from "next/link"

import { BlogCard } from "@/components/blog-card"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { getFeaturedPosts } from "@/sanity/queries"

export async function FromTheBlog() {
  const posts = await getFeaturedPosts()
  if (!posts.length) return null

  return (
    <section className="section">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <SectionHeading
          eyebrow="From the Blog"
          title="Commentary and guidance from the field"
          description="Policy breakdowns and practical notes from Cyrkle B. Brent and the TBHE team."
        />
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-5xl gap-x-8 gap-y-12 sm:grid-cols-2">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.06}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-8 text-center">
        <Link
          href="/blog"
          className="text-body-sm font-medium text-muted-ink transition-colors hover:text-primary"
        >
          Read more on the blog &rarr;
        </Link>
      </Reveal>
    </section>
  )
}

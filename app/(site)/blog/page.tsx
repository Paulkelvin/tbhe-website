import { BlogHero } from "@/components/blog-hero"
import { BlogCard } from "@/components/blog-card"
import { Reveal } from "@/components/reveal"
import { pageMetadata } from "@/lib/seo"
import { getSubstackPosts, SUBSTACK_URL } from "@/lib/substack"
import { getPosts } from "@/sanity/queries"

export const metadata = pageMetadata({
  title: "Blog: Special Education & Educator Insights",
  description:
    "Commentary, policy breakdowns, and practical guidance for educators from The Beautifully Human Educator.",
  path: "/blog",
  image: "/images/blog/blog-hero-banner.jpg",
})

export const revalidate = 60

export default async function BlogPage() {
  const [sitePosts, substackPosts] = await Promise.all([getPosts(), getSubstackPosts()])
  const posts = [...sitePosts, ...substackPosts].sort(
    (a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime()
  )

  return (
    <>
      <BlogHero />

      <section className="section">
        <div className="mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <Reveal className="relative overflow-hidden bg-primary/[0.045] px-7 py-14 text-center sm:px-10 sm:py-16">
              <p className="eyebrow text-arm-media-ink">Coming Soon</p>
              <h2 className="text-h2 mx-auto mt-4 max-w-xl text-ink">
                New articles are on the way.
              </h2>
              <p className="text-lead mx-auto mt-4 max-w-md text-body">
                Check back soon for commentary and guidance from the TBHE
                team.
              </p>
            </Reveal>
          ) : (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <BlogCard post={post} headingLevel="h2" />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-16 border-t border-hairline pt-9 text-center sm:mt-20 sm:pt-10">
            <h2 className="text-h3 text-ink">The Long Hallway</h2>
            <p className="text-body-sm mx-auto mt-2.5 max-w-md text-body">
              Honest conversations about schools, leadership, and the
              children we serve — Cyrkle&apos;s newsletter on Substack.
            </p>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
                Subscribe on Substack
              </span>
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}

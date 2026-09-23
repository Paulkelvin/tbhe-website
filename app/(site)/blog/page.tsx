import { BlogHero } from "@/components/blog-hero"
import { BlogCard } from "@/components/blog-card"
import { Reveal } from "@/components/reveal"
import { pageMetadata } from "@/lib/seo"
import { getPosts } from "@/sanity/queries"

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Commentary, policy breakdowns, and practical guidance for educators from The Beautifully Human Educator.",
  path: "/blog",
  image: "/images/blog/blog-hero-banner.jpg",
})

// Posts are managed in Sanity, so the blog updates as soon as an editor
// publishes something new — no redeploy required.
export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPosts()

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
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

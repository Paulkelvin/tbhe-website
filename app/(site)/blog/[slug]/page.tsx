import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArticleBody } from "@/components/article-body"
import { Reveal } from "@/components/reveal"
import { formatPostDate } from "@/lib/blog"
import { SITE_URL } from "@/lib/content"
import { getPostBySlug, getPosts } from "@/sanity/queries"

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const description = post.excerpt ?? ""
  const path = `/blog/${slug}`

  return {
    title: post.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description,
      url: path,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const date = formatPostDate(post.publishedAt)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    image: post.coverImage ? [post.coverImage] : undefined,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="section">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="text-body-sm font-medium text-muted-ink transition-colors hover:text-primary"
            >
              &larr; Back to the Blog
            </Link>

            <p className="eyebrow mt-6 text-primary">{date}</p>
            <h1 className="text-h1 mt-3 text-ink">{post.title}</h1>
            {post.author ? (
              <p className="text-body-sm mt-4 text-muted-ink">
                By {post.author}
              </p>
            ) : null}
          </Reveal>

          {post.coverImage ? (
            <Reveal delay={0.05}>
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            </Reveal>
          ) : null}

          {post.body?.length ? (
            <Reveal delay={0.1} className="mt-10">
              <ArticleBody value={post.body} />
            </Reveal>
          ) : null}
        </div>
      </article>
    </>
  )
}

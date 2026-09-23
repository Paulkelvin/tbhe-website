import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/content"
import { getPosts } from "@/sanity/queries"

const ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/ecosystem", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/ecosystem/consulting", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/ecosystem/mission-139", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/ecosystem/media", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/donate", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const posts = await getPosts()

  return [
    ...ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}

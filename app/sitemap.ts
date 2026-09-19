import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tbhe-website.vercel.app"

const ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/ecosystem", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/ecosystem/consulting", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/ecosystem/mission-139", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/ecosystem/media", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}

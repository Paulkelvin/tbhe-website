import type { Post } from "@/sanity/queries"

export const SUBSTACK_URL = "https://thelonghallway.substack.com"

function tag(xml: string, name: string) {
  const match = xml.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`))
  return match?.[1].trim()
}

export async function getSubstackPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${SUBSTACK_URL}/feed`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const xml = await res.text()

    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
      const link = tag(item, "link") ?? SUBSTACK_URL
      const pubDate = tag(item, "pubDate")
      return {
        title: tag(item, "title") ?? "",
        slug: link,
        excerpt: tag(item, "description"),
        coverImage: item.match(/<enclosure url="([^"]+)"/)?.[1],
        publishedAt: pubDate ? new Date(pubDate).toISOString() : undefined,
        externalUrl: link,
      }
    })
  } catch {
    return []
  }
}

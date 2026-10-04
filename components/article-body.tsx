import { PortableText, type PortableTextComponents } from "@portabletext/react"

import type { PortableTextBlock } from "@/sanity/queries"

const components: PortableTextComponents = {
  block: {
    // Body headings sit directly under the post's h1, so they render one level up while keeping their look.
    h3: ({ children }) => <h2 className="article-h3">{children}</h2>,
    h4: ({ children }) => <h3 className="article-h4">{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
}

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose-article">
      <PortableText value={value as never} components={components} />
    </div>
  )
}

import { PortableText, type PortableTextComponents } from "@portabletext/react"

import type { PortableTextBlock } from "@/sanity/queries"

const components: PortableTextComponents = {
  block: {
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
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

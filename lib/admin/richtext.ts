// A tiny markdown-lite <-> Portable Text bridge so the admin can edit rich
// text as one plain textarea instead of needing a full WYSIWYG editor.
// Supported syntax: blank line between paragraphs, "## " for a heading,
// "### " for a subheading, "- " for a bullet list item. No bold/italic/
// links — round-trips cleanly for exactly that subset.

type PortableTextSpan = { _type: "span"; _key: string; text: string; marks: string[] }
type PortableTextBlock = {
  _type: "block"
  _key: string
  style: string
  listItem?: "bullet"
  level?: number
  markDefs: unknown[]
  children: PortableTextSpan[]
}

export function textToBlocks(text: string): PortableTextBlock[] {
  const lines = text.split("\n")
  const blocks: PortableTextBlock[] = []
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    let style = "normal"
    let listItem: "bullet" | undefined
    let content = line
    if (line.startsWith("### ")) {
      style = "h4"
      content = line.slice(4)
    } else if (line.startsWith("## ")) {
      style = "h3"
      content = line.slice(3)
    } else if (line.startsWith("- ")) {
      listItem = "bullet"
      content = line.slice(2)
    }
    blocks.push({
      _type: "block",
      _key: crypto.randomUUID(),
      style,
      listItem,
      level: listItem ? 1 : undefined,
      markDefs: [],
      children: [{ _type: "span", _key: crypto.randomUUID(), text: content, marks: [] }],
    })
  }
  return blocks
}

export function blocksToText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return ""
  const lines: string[] = []
  let prevWasBullet = false
  blocks.forEach((block: PortableTextBlock, i: number) => {
    const text = Array.isArray(block.children) ? block.children.map((c) => c.text ?? "").join("") : ""
    const isBullet = block.listItem === "bullet"
    const prefix = isBullet ? "- " : block.style === "h3" ? "## " : block.style === "h4" ? "### " : ""
    if (i > 0 && !(isBullet && prevWasBullet)) lines.push("")
    lines.push(prefix + text)
    prevWasBullet = isBullet
  })
  return lines.join("\n")
}

export function FeatureList({
  items,
}: {
  items: readonly { title: string; description: string }[]
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-hairline bg-surface-card p-6"
        >
          <h3 className="text-base font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm text-body">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

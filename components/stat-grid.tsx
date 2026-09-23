export function StatGrid({
  stats,
}: {
  stats: readonly { value: string; label: string }[]
}) {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-canvas-soft px-3 py-8 text-center"
        >
          <dt className="order-2 text-body-sm text-body">{stat.label}</dt>
          <dd className="order-1 text-h2 text-primary">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

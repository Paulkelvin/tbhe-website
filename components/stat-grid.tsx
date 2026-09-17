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
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-canvas-soft px-6 py-8 text-center"
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd className="text-3xl font-semibold text-primary sm:text-4xl">
            {stat.value}
          </dd>
          <p className="text-sm text-body">{stat.label}</p>
        </div>
      ))}
    </dl>
  )
}

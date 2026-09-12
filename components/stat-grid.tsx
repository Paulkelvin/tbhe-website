export function StatGrid({
  stats,
}: {
  stats: readonly { value: string; label: string }[]
}) {
  return (
    <dl className="grid grid-cols-2 gap-8 border-y border-hairline py-10 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="text-3xl font-semibold text-ink sm:text-4xl">
            {stat.value}
          </dd>
          <p className="mt-2 text-sm text-body">{stat.label}</p>
        </div>
      ))}
    </dl>
  )
}

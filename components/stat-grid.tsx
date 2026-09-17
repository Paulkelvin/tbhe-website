import {
  ChalkboardTeacher,
  MapPin,
  Stack,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr"

const ICONS = [ChalkboardTeacher, UsersThree, Stack, MapPin]

export function StatGrid({
  stats,
}: {
  stats: readonly { value: string; label: string }[]
}) {
  return (
    <dl className="grid grid-cols-2 gap-8 border-y border-hairline py-10 sm:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = ICONS[index]
        return (
          <div key={stat.label} className="flex flex-col items-center text-center">
            {Icon ? (
              <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={22} weight="duotone" />
              </div>
            ) : null}
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-3xl font-semibold text-ink sm:text-4xl">
              {stat.value}
            </dd>
            <p className="mt-2 text-sm text-body">{stat.label}</p>
          </div>
        )
      })}
    </dl>
  )
}

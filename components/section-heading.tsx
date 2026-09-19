export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="text-h2 mt-3 text-ink">
        {title}
      </h2>
      {description ? (
        <p className="text-lead mt-4 text-body">{description}</p>
      ) : null}
    </div>
  )
}

import { ArtDefs, HandDrawnStroke } from "@/components/organic-art"
import { ContactForm } from "@/components/contact-form"
import { ARMS, type Arm } from "@/lib/content"

const ARM_LABEL: Record<Arm["slug"], string> = {
  consulting: "Consulting",
  "mission-139": "Mission 139",
  media: "Media",
}

const ARM_LINE: Record<Arm["slug"], string> = {
  consulting: "M14,0 C22,16 55,34 100,52",
  "mission-139": "M98,0 C102,16 97,34 100,52",
  media: "M186,0 C178,16 145,34 100,52",
}

// Page-specific hero for /contact only — the form is part of the hero
// itself (no separate boxed section below), with a small abstract mark
// showing the three arms converging into one inbox.
export function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas">
      <ArtDefs />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:gap-16 lg:py-24">
        <div className="text-center lg:pt-3 lg:text-left">
          <p className="eyebrow text-primary">Contact</p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            One inbox for consulting, advocacy, and media
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base text-body sm:text-lg lg:mx-0">
            Tell us why you&apos;re reaching out and the right person on the
            TBHE team will follow up.
          </p>

          {/* Mobile: the three-arm detail simplifies to a single quiet line. */}
          <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-muted-ink uppercase lg:hidden">
            Consulting &middot; Mission 139 &middot; Media &amp; Publishing
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          {/* Desktop: three fine lines, one per arm, converging toward the
              form — abstract, not a diagram. */}
          <div className="relative -mb-1 hidden h-14 lg:block">
            {ARMS.map((arm) => (
              <span
                key={arm.slug}
                className="absolute top-0 -translate-x-1/2 text-[10px] font-semibold tracking-[0.14em] uppercase"
                style={{
                  left:
                    arm.slug === "consulting"
                      ? "14%"
                      : arm.slug === "media"
                        ? "86%"
                        : "50%",
                  color: `var(--arm-${arm.color})`,
                }}
              >
                {ARM_LABEL[arm.slug]}
              </span>
            ))}
            {ARMS.map((arm) => (
              <HandDrawnStroke
                key={arm.slug}
                className="top-4 left-0 h-10 w-full"
                d={ARM_LINE[arm.slug]}
                color={`var(--arm-${arm.color})`}
                strokeWidth={1.3}
                viewBox="0 0 200 52"
              />
            ))}
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}

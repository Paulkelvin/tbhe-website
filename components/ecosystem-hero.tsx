import { ArtDefs } from "@/components/organic-art"
import { getArms } from "@/sanity/queries"

// Page-specific hero for /ecosystem only. Desktop's signature moment is a
// large ribbon composition — three wide, organic-edged paths entering from
// three directions and converging on a shared center — so the "three arms,
// one mission" structure reads instantly, before any copy. Mobile keeps the
// simpler typographic lockup rather than squeezing the ribbons down.
export async function EcosystemHero() {
  const [consulting, mission, media] = await getArms()
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas">
      <ArtDefs />
      <div className="mx-auto max-w-4xl px-6 pt-16 text-center sm:px-8 sm:pt-20">
        <p className="eyebrow text-primary">The Ecosystem</p>
        {/* The page has no single visible headline at every breakpoint
            (mobile shows "Three Arms / One Mission" as styled spans,
            desktop shows it split across the ribbon composition), so a
            visually-hidden h1 gives the page exactly one real heading
            without changing either layout. */}
        <h1 className="sr-only">Three Arms, One Mission</h1>

        {/* Mobile / tablet: the typographic lockup. */}
        <div className="mt-5 lg:hidden">
          <span className="text-display block text-ink">
            Three Arms
          </span>
          <span className="mt-1 flex items-center justify-center gap-3 sm:gap-4">
            <span className="text-display text-primary italic">
              One Mission
            </span>
          </span>
          <span className="mt-4 flex items-center justify-center gap-1.5" aria-hidden>
            <span className="h-1 w-6 rounded-full bg-arm-consulting sm:w-8" />
            <span className="h-1 w-6 rounded-full bg-arm-mission sm:w-8" />
            <span className="h-1 w-6 rounded-full bg-arm-media sm:w-8" />
          </span>
        </div>

        <p className="text-lead mx-auto mt-8 max-w-xl text-body lg:mt-6">
          Consulting for schools, advocacy for families, and thought
          leadership for the field, each built to stand on its own and
          stronger together.
        </p>
      </div>

      {/* Desktop: the ribbon composition — full-bleed, breaking the content
          grid. Three organic-edged paths enter from three directions and
          converge on "One Mission," distinct at their edges and overlapping
          only where they meet. */}
      <div className="relative left-1/2 mt-4 hidden aspect-[1440/680] w-screen -translate-x-1/2 lg:block">
        <svg
          viewBox="0 0 1440 680"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path
            d="M0,10 C320,70 560,260 680,400 L705,450 C580,300 320,110 0,180 Z"
            fill="var(--arm-consulting)"
            opacity="0.45"
            filter="url(#paper-roughen-torn)"
            style={{ mixBlendMode: "multiply" }}
          />
          <path
            d="M1440,10 C1120,70 880,260 760,400 L735,450 C860,300 1120,110 1440,180 Z"
            fill="var(--arm-mission)"
            opacity="0.45"
            filter="url(#paper-roughen-torn)"
            style={{ mixBlendMode: "multiply" }}
          />
          <path
            d="M620,680 C650,580 670,500 700,450 L740,450 C750,510 770,590 790,680 Z"
            fill="var(--arm-media)"
            opacity="0.45"
            filter="url(#paper-roughen-torn)"
            style={{ mixBlendMode: "multiply" }}
          />
        </svg>

        <div className="absolute top-[9%] left-[6%] max-w-[15rem] text-left xl:left-[9%]">
          <p className="eyebrow text-arm-consulting">
            01
          </p>
          <p className="text-h3 mt-1.5 text-ink">
            {consulting.name}
          </p>
        </div>

        <div className="absolute top-[9%] right-[6%] max-w-[15rem] text-right xl:right-[9%]">
          <p className="eyebrow text-arm-mission-ink">
            02
          </p>
          <p className="text-h3 mt-1.5 text-ink">
            {mission.name}
          </p>
        </div>

        <div className="absolute bottom-[7%] left-1/2 max-w-[15rem] -translate-x-1/2 text-center">
          <p className="eyebrow text-arm-media-ink">
            03
          </p>
          <p className="text-h3 mt-1.5 text-ink">
            {media.name}
          </p>
        </div>

        <div className="absolute top-[63%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="rounded-full bg-canvas/85 px-10 py-7 backdrop-blur-[2px]">
            <p className="eyebrow text-muted-ink">
              TBHE
            </p>
            <p className="text-h2 mt-2 text-ink italic">
              One Mission
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

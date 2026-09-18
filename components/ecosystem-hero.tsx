import { ArtDefs } from "@/components/organic-art"
import { ARMS } from "@/lib/content"

const [consulting, mission, media] = ARMS

// Page-specific hero for /ecosystem only. Desktop's signature moment is a
// large ribbon composition — three wide, organic-edged paths entering from
// three directions and converging on a shared center — so the "three arms,
// one mission" structure reads instantly, before any copy. Mobile keeps the
// simpler typographic lockup rather than squeezing the ribbons down.
export function EcosystemHero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas">
      <ArtDefs />
      <div className="mx-auto max-w-4xl px-6 pt-16 text-center sm:px-8 sm:pt-20">
        <p className="eyebrow text-primary">The Ecosystem</p>

        {/* Mobile / tablet: the typographic lockup. */}
        <div className="mt-5 leading-[0.95] lg:hidden">
          <span className="font-display block text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
            Three Arms
          </span>
          <span className="mt-1 flex items-center justify-center gap-3 sm:gap-4">
            <span className="font-display text-5xl font-semibold tracking-tight text-primary italic sm:text-7xl">
              One Mission
            </span>
          </span>
          <span className="mt-4 flex items-center justify-center gap-1.5" aria-hidden>
            <span className="h-1 w-6 rounded-full bg-arm-consulting sm:w-8" />
            <span className="h-1 w-6 rounded-full bg-arm-mission sm:w-8" />
            <span className="h-1 w-6 rounded-full bg-arm-media sm:w-8" />
          </span>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-base text-body sm:text-lg lg:mt-6">
          Consulting for schools, advocacy for families, and thought
          leadership for the field — each built to stand on its own and
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
          <p className="text-[11px] font-semibold tracking-[0.2em] text-arm-consulting uppercase">
            01
          </p>
          <p className="font-display mt-1.5 text-xl font-semibold text-ink">
            {consulting.name}
          </p>
        </div>

        <div className="absolute top-[9%] right-[6%] max-w-[15rem] text-right xl:right-[9%]">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-arm-mission-ink uppercase">
            02
          </p>
          <p className="font-display mt-1.5 text-xl font-semibold text-ink">
            {mission.name}
          </p>
        </div>

        <div className="absolute bottom-[7%] left-1/2 max-w-[15rem] -translate-x-1/2 text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-arm-media-ink uppercase">
            03
          </p>
          <p className="font-display mt-1.5 text-xl font-semibold text-ink">
            {media.name}
          </p>
        </div>

        <div className="absolute top-[63%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="rounded-full bg-canvas/85 px-10 py-7 backdrop-blur-[2px]">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-muted-ink uppercase">
              TBHE
            </p>
            <p className="font-display mt-2 text-3xl font-semibold text-ink italic xl:text-4xl">
              One Mission
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

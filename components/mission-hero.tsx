import Link from "next/link"
import Image from "next/image"

import { InstagramLogo } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { OrganicBlob } from "@/components/organic-art"
import { ARM_COLOR_CLASS, type Arm } from "@/lib/content"
import { getSiteSettings } from "@/sanity/queries"

const PATH_ALT =
  "A hand-drawn vine of a path connecting small waypoints reading Heard, Understood, Supported, and Empowered, ending at an open door beneath a heart"

// Page-specific hero for /ecosystem/mission-139 only — a quieter, sage-led
// composition with the Support Path illustration crossing behind the
// content, instead of ArmHero's centered card-on-gradient treatment used by
// the other two arm pages.
export async function MissionHero({ arm, ctaHref }: { arm: Arm; ctaHref: string }) {
  const colors = ARM_COLOR_CLASS[arm.color]
  const settings = await getSiteSettings()
  const mission139Instagram =
    settings.socialLinks.find((s) => s.platform === "mission139-instagram")?.url ??
    "https://www.instagram.com/tbhe_mission_139"

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-arm-mission/[0.06]">
      <OrganicBlob
        color="var(--arm-mission)"
        variant={0}
        filterId="paper-roughen-torn"
        rotate={4}
        className="top-[-32%] left-[-10%] h-[130%] w-[36%] opacity-[0.08]"
      />

      {/* Desktop: the Support Path enters low from the left edge, passes
          beneath the content, and exits past the right edge — a closing
          flourish rather than crossing the readable text. */}
      <div className="pointer-events-none absolute bottom-[-8%] left-[-8%] hidden h-24 w-[120%] opacity-[0.22] lg:block">
        <Image
          src="/images/mission-support-path.png"
          alt={PATH_ALT}
          fill
          sizes="120vw"
          className="object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center sm:px-8 lg:py-28">
        <span
          className={cn(
            "caption inline-flex rounded-full bg-surface-card px-3 py-1",
            colors.text
          )}
        >
          {arm.kicker}
        </span>
        <h1 className="text-h1 mt-5 text-ink">
          {arm.name}
        </h1>
        <p className="text-lead mx-auto mt-5 max-w-2xl text-body">
          {arm.summary}
        </p>
        <p className="text-body-sm mx-auto mt-3 max-w-2xl text-muted-ink">
          For: {arm.audience}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button asChild size="lg">
            <Link href={ctaHref}>{arm.cta}</Link>
          </Button>
          <Link
            href={mission139Instagram}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "caption inline-flex items-center gap-1.5 transition-colors hover:text-arm-mission-ink",
              colors.text
            )}
          >
            <InstagramLogo size={16} />
            Follow @tbhe_mission_139
          </Link>
        </div>
      </div>

      {/* Mobile: just the small "Heard" waypoint from the path's left end,
          tucked beneath the content rather than a full band. */}
      <div className="relative mx-auto -mt-6 mb-6 h-14 w-32 opacity-[0.45] lg:hidden">
        <Image
          src="/images/mission-support-path.png"
          alt=""
          fill
          sizes="128px"
          className="object-cover"
          style={{ objectPosition: "2% 45%" }}
        />
      </div>
    </section>
  )
}

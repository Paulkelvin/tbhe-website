import Image from "next/image"

const BLOG_HERO_ALT =
  "A sunlit desk with a stack of books, a speckled ceramic mug on a wooden coaster, an open journal with a pen, and trailing houseplants in a warm, plant-filled room"

export function BlogHero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-surface-card pb-10 sm:pb-14 lg:pb-16">
      <div className="relative h-[200px] w-full sm:h-[280px] lg:h-[360px]">
        <Image
          src="/images/blog/blog-hero-banner.jpg"
          alt={BLOG_HERO_ALT}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      {/* An opaque floating card over the photo, not text directly on it —
          legibility then never depends on where the photo happens to be
          light or busy. */}
      <div className="relative z-10 mx-4 -mt-14 sm:mx-8 sm:-mt-20 lg:mx-auto lg:-mt-24 lg:max-w-2xl">
        <div className="rounded-2xl bg-surface-card p-6 text-center shadow-[0_20px_45px_-28px_rgba(37,24,39,0.35)] sm:p-8 lg:p-10">
          <p className="eyebrow text-primary">The Blog</p>
          <h1 className="text-h1 mt-4 text-ink">
            Notes from the field on educator support and equity
          </h1>
          <p className="text-lead mx-auto mt-5 max-w-xl text-body">
            Commentary, policy breakdowns, and practical guidance from Cyrkle
            B. Brent and the TBHE team.
          </p>
        </div>
      </div>
    </section>
  )
}

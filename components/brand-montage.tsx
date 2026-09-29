"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "@phosphor-icons/react/dist/ssr"

import { PaperSheet } from "@/components/organic-art"
import { Reveal } from "@/components/reveal"

export function BrandMontage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [pausedByUser, setPausedByUser] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Only plays while on screen, so it isn't downloading or decoding for visitors who never scroll this far.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.35 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [pausedByUser])

  function toggle() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      setPausedByUser(false)
      video.play().catch(() => {})
    } else {
      setPausedByUser(true)
      video.pause()
    }
  }

  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-20 lg:py-(--section-padding)">
      <PaperSheet
        color="var(--arm-consulting)"
        rotate={-10}
        className="-top-16 -left-12 h-64 w-48 opacity-30 sm:h-80 sm:w-60"
      />
      <PaperSheet
        color="var(--arm-mission)"
        rotate={8}
        filterId="paper-roughen-1"
        className="-right-10 -bottom-20 h-56 w-44 opacity-15 sm:h-72 sm:w-56"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-arm-mission!">Inside the Work</p>
          <h2 className="text-h2 mt-3 text-canvas">
            Real classrooms. Real educators.{" "}
            <span className="text-arm-mission italic">Real change.</span>
          </h2>
          <p className="text-body-sm mt-5 max-w-md text-canvas/75">
            Coaching sessions, student celebrations, staff training days and
            community events: a few moments from the schools and people TBHE
            works alongside.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="relative mx-2 sm:mx-6 lg:mx-0">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-2xl border-2 border-arm-mission sm:translate-x-5 sm:translate-y-5"
          />
          <div className="relative overflow-hidden rounded-2xl bg-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-canvas/10">
            <video
              ref={videoRef}
              poster="/videos/brand-montage-poster.jpg"
              muted
              loop
              playsInline
              preload="none"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              aria-label="Montage of TBHE moments: classroom coaching, students hugging Cyrkle Brent, staff group photos, a themed community event and an awards ceremony"
              className="aspect-video w-full object-cover"
            >
              <source src="/videos/brand-montage.webm" type="video/webm" />
              <source src="/videos/brand-montage.mp4" type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause video" : "Play video"}
              className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-full bg-ink/70 text-canvas backdrop-blur transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-arm-mission focus-visible:outline-none"
            >
              {playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

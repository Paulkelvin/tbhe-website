"use client"

import { useId } from "react"
import { HandWaving } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

export type AvatarMood =
  "idle" | "greeting" | "thinking" | "happy" | "concerned"

type HumanAvatarProps = {
  size?: number
  mood?: AvatarMood
  className?: string
}

/**
 * A warm, illustrated guide rather than a robot. Moods drive small, real
 * human cues: a wave on open, a thinking tilt while replying, a smile when
 * an answer lands, and a softer concerned expression on errors.
 */
export function HumanAvatar({
  size = 44,
  mood = "idle",
  className,
}: HumanAvatarProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "")
  const backgroundId = `avatar-bg-${uid}`
  const clipId = `avatar-clip-${uid}`
  const skinId = `avatar-skin-${uid}`
  const hairId = `avatar-hair-${uid}`
  const shoulderId = `avatar-shoulder-${uid}`

  const skinFill = `url(#${skinId})`
  const hairFill = `url(#${hairId})`
  const shoulderFill = `url(#${shoulderId})`

  const thinking = mood === "thinking"
  const concerned = mood === "concerned"
  const happy = mood === "happy"

  const leftBrow = concerned
    ? "M23 25.7 Q26 24.3 28.8 24.9"
    : "M23 25.1 Q26 24 28.8 25"
  const rightBrow = concerned
    ? "M35.2 24.9 Q38 24.3 41 25.7"
    : "M35.2 25 Q38 24 41 25.1"

  return (
    <span
      className={cn(
        "human-avatar relative inline-flex shrink-0",
        mood === "greeting" && "human-avatar--greeting",
        thinking && "human-avatar--thinking",
        happy && "human-avatar--happy",
        concerned && "human-avatar--concerned",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        aria-hidden
        className="block"
      >
        <defs>
          <linearGradient id={backgroundId} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f8f3fa" />
            <stop offset="1" stopColor="#e3d3ea" />
          </linearGradient>
          <linearGradient id={skinId} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ab7859" />
            <stop offset="1" stopColor="#895440" />
          </linearGradient>
          <linearGradient id={hairId} x1="0" y1="0" x2="0.8" y2="1">
            <stop stopColor="#3b262b" />
            <stop offset="1" stopColor="#211417" />
          </linearGradient>
          <linearGradient id={shoulderId} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#8a4aa3" />
            <stop offset="1" stopColor="#603072" />
          </linearGradient>
          <clipPath id={clipId}>
            <circle cx="32" cy="32" r="32" />
          </clipPath>
        </defs>

        <circle cx="32" cy="32" r="32" fill={`url(#${backgroundId})`} />

        <g clipPath={`url(#${clipId})`}>
          {/* Shoulders and collar */}
          <path
            d="M6 64 C8 52 19 45 32 45 C45 45 56 52 58 64 Z"
            fill={shoulderFill}
          />
          <ellipse
            cx="32"
            cy="45.6"
            rx="13"
            ry="2.1"
            fill="#3a2030"
            opacity="0.16"
          />
          <path
            d="M26.5 45 L32 52 L37.5 45 L34 43.8 L32 47 L30 43.8 Z"
            fill="#f6eef9"
          />

          <rect
            x="28.4"
            y="38"
            width="7.2"
            height="9"
            rx="3.4"
            fill={skinFill}
          />

          <g className="human-avatar__head">
            {/* Curly hair, back volume and side puffs */}
            <ellipse cx="32" cy="27" rx="17.2" ry="17.5" fill={hairFill} />
            <circle cx="16.5" cy="27" r="6.2" fill={hairFill} />
            <circle cx="47.5" cy="27" r="6.2" fill={hairFill} />
            <circle cx="21" cy="16.5" r="5.4" fill={hairFill} />
            <circle cx="32" cy="12.8" r="5.8" fill={hairFill} />
            <circle cx="43" cy="16.5" r="5.4" fill={hairFill} />
            <circle cx="20" cy="18" r="2.1" fill="#4a3036" />
            <circle cx="32" cy="13.6" r="2.2" fill="#4a3036" />
            <circle cx="44" cy="18" r="2.1" fill="#4a3036" />
            <path
              d="M18.5 21 C21 13.5 30 9.5 39.5 13"
              stroke="#56383f"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />

            {/* Face */}
            <ellipse cx="32" cy="30" rx="12.6" ry="13.6" fill={skinFill} />
            <circle cx="19.4" cy="31" r="3" fill="#8a5540" />
            <circle cx="44.6" cy="31" r="3" fill="#8a5540" />
            <circle cx="18.9" cy="34.2" r="1.35" fill="#d9a441" />
            <circle cx="45.1" cy="34.2" r="1.35" fill="#d9a441" />
            <ellipse
              cx="26.5"
              cy="24"
              rx="4.2"
              ry="2.6"
              fill="#ffffff"
              opacity="0.07"
            />

            {/* Brows */}
            <path
              d={leftBrow}
              stroke="#3a2628"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={rightBrow}
              stroke="#3a2628"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Eyes */}
            <g className="human-avatar__eyes">
              <g className="human-avatar__pupils">
                <ellipse cx="26.6" cy="29.4" rx="2.7" ry="1.9" fill="#ffffff" />
                <circle cx="27" cy="29.5" r="1.2" fill="#2a1b1e" />
                <circle
                  cx="26.65"
                  cy="29.15"
                  r="0.36"
                  fill="#ffffff"
                  opacity="0.9"
                />
                <ellipse cx="37.4" cy="29.4" rx="2.7" ry="1.9" fill="#ffffff" />
                <circle cx="37.8" cy="29.5" r="1.2" fill="#2a1b1e" />
                <circle
                  cx="37.45"
                  cy="29.15"
                  r="0.36"
                  fill="#ffffff"
                  opacity="0.9"
                />
              </g>
            </g>

            {/* Glasses */}
            <rect
              x="22.1"
              y="26.3"
              width="9"
              height="6.5"
              rx="2.7"
              fill="none"
              stroke="#332327"
              strokeWidth="1.1"
            />
            <rect
              x="32.9"
              y="26.3"
              width="9"
              height="6.5"
              rx="2.7"
              fill="none"
              stroke="#332327"
              strokeWidth="1.1"
            />
            <path
              d="M31.1 29.1 H32.9"
              stroke="#332327"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M22.1 28.5 L19.6 29.3 M41.9 28.5 L44.4 29.3"
              stroke="#332327"
              strokeWidth="1.1"
              strokeLinecap="round"
            />

            {/* Nose and mouth */}
            <path
              d="M32 31.6 Q30.9 33.7 32.6 33.9"
              stroke="#7a4a35"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
            {happy ? (
              <path
                d="M27 37.6 Q32 42.8 37 37.6 Q32 40.5 27 37.6 Z"
                fill="#5b2f2f"
              />
            ) : (
              <path
                d={
                  concerned
                    ? "M28 39 Q32 37.2 36 39"
                    : thinking
                      ? "M28.5 38.6 Q32 39.8 35.5 38.6"
                      : "M27.5 38 Q32 41 36.5 38"
                }
                stroke="#5b2f2f"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Cheeks */}
            <ellipse
              cx="22.8"
              cy="34"
              rx="2.1"
              ry="1.2"
              fill="#b9755c"
              opacity="0.4"
            />
            <ellipse
              cx="41.2"
              cy="34"
              rx="2.1"
              ry="1.2"
              fill="#b9755c"
              opacity="0.4"
            />
          </g>
        </g>
      </svg>

      {mood === "greeting" ? (
        <span className="absolute -right-1 -bottom-1 flex items-center justify-center rounded-full bg-surface-card p-0.5 shadow-sm">
          <HandWaving
            size={Math.max(14, Math.round(size * 0.4))}
            weight="fill"
            className="human-avatar__wave text-[#c4862c]"
          />
        </span>
      ) : null}
    </span>
  )
}

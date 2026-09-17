import { cn } from "@/lib/utils"

// A soft blurred color shape for breaking up flat backgrounds. Purely
// decorative — always aria-hidden, positioned absolutely by the caller.
export function DecorativeBlob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("absolute rounded-full blur-3xl", className)}
    />
  )
}

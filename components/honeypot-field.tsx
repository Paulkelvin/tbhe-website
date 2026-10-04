import { HONEYPOT_FIELD } from "@/lib/form-guard"

// Invisible to people and screen readers; bots that fill every input reveal themselves by filling this one.
export function HoneypotField() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}

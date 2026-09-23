import { redirect } from "next/navigation"

// The donation form now lives on the Mission 139 page itself (the "Give"
// section) instead of a separate page, so anything still pointing at
// /donate — an old link, a bookmark, a search result — lands there.
export default function DonatePage() {
  redirect("/ecosystem/mission-139#give")
}

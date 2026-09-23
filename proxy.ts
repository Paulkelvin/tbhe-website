import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { ADMIN_COOKIE_NAME, isValidSession } from "@/lib/admin/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  if (await isValidSession(cookie)) {
    return NextResponse.next()
  }

  const loginUrl = new URL("/admin/login", request.url)
  loginUrl.searchParams.set("from", pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/admin/:path*"],
}

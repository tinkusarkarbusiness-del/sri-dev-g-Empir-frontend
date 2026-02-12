import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("__session")?.value;
  const role = req.cookies.get("role")?.value;

  const { pathname } = req.nextUrl;

  // Allow login page always
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // ❌ Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ❌ Non-admin opening admin
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("__session")?.value;
  const role = req.cookies.get("role")?.value;
  const { pathname } = req.nextUrl;

  // ✅ Always allow login
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // ❌ Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🧠 ADMIN ROUTE LOGIC (FIXED)
  if (pathname.startsWith("/admin")) {
    // token hai but role abhi set nahi hui → allow once
    if (!role) {
      return NextResponse.next();
    }

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;

  // login page ko allow karo (IMPORTANT)
  if (req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // admin page protect karo
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}


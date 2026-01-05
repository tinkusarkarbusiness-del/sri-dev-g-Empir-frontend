import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("__session")?.value;

  // 🔒 login hi nahi
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = await getAuth(firebaseAdminApp).verifyIdToken(token);

    // 🔥 ADMIN ROLE CHECK
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      decoded.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};

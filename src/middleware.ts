import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("__session")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = await getAuth(firebaseAdminApp).verifyIdToken(session);

      if (
        decoded.role !== "admin" &&
        decoded.role !== "superadmin"
      ) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

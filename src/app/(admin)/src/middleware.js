import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "./firebase/adminConfig";

export async function middleware(req) {
  const token = req.cookies.get("__session")?.value;

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await getAuth(firebaseAdminApp).verifyIdToken(token);
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/authenticated/:path*",
    "/admin/:path*"
  ],
};

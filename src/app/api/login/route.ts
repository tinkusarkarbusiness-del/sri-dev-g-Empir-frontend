import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin"; // firebase-admin

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    // ✅ Verify Firebase ID Token
    const decoded = await adminAuth.verifyIdToken(token);

    const email = decoded.email || "";
    let role = "user";

    // 🔐 Admin Email Check
    if (email === process.env.ADMIN_EMAIL) {
      role = "admin";
    }

    // 🍪 Set HttpOnly Cookie (Secure)
    cookies().set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 5, // 5 days
    });

    cookies().set("role", role, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return NextResponse.json({ role });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}


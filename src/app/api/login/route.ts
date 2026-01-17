import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";
import { cookies } from "next/headers";

const OWNER_EMAIL = "tinkusarkar.basiness@gmail.com";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }

    // 🔐 Firebase token verify
    const decoded = await getAuth(firebaseAdminApp).verifyIdToken(token);

    // 🧠 ROLE DECISION (SERVER SIDE)
    const role = decoded.email === OWNER_EMAIL ? "admin" : "user";

    const cookieStore = cookies();

    // 🔐 Auth token (httpOnly = secure)
    cookieStore.set("__session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    // 🧠 Role cookie (middleware read karega)
    cookieStore.set("role", role, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return NextResponse.json({ success: true, role });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

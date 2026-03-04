import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    // ✅ Create Firebase session cookie
    const sessionCookie = await getAuth(firebaseAdminApp)
      .createSessionCookie(token, { expiresIn });

    const response = NextResponse.json({ success: true });

    // ✅ Set browser cookie
    response.cookies.set({
      name: "__session",
      value: sessionCookie,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

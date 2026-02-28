import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie = await getAuth(firebaseAdminApp)
      .createSessionCookie(token, { expiresIn });

    const response = NextResponse.json({ success: true });

    response.cookies.set("__session", sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

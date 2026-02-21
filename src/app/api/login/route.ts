import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }

    const decoded = await getAuth(firebaseAdminApp).verifyIdToken(token);
    const db = getFirestore(firebaseAdminApp);

    const uid = decoded.uid;
    const email = decoded.email ?? "";

    const OWNER_EMAIL = "tinkusarkar.business@gmail.com";

    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();

    let role = "user";

    if (email === OWNER_EMAIL) {
      role = "admin";
    } else if (userSnap.exists) {
      role = userSnap.data()?.role || "user";
    }

    await userRef.set(
      {
        email,
        role,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    const res = NextResponse.json({ success: true });

    // 🔐 SESSION COOKIE
    res.cookies.set("__session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    // 🔐 ROLE COOKIE (ALSO httpOnly)
    res.cookies.set("role", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

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

    // 🔐 Verify Firebase ID token
    const decoded = await getAuth(firebaseAdminApp).verifyIdToken(token);
    const db = getFirestore(firebaseAdminApp);

    const uid = decoded.uid;
    const email = decoded.email ?? "";

    // 🔎 Firestore user check
    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();

    const OWNER_EMAIL = "tinkusarkar.business@gmail.com";

    let role = "user";

    if (email === OWNER_EMAIL) {
      role = "admin";

      await userRef.set(
        {
          email,
          role: "admin",
          createdAt: new Date(),
        },
        { merge: true }
      );
    } else if (userSnap.exists) {
      role = userSnap.data()?.role || "user";
    } else {
      await userRef.set({
        email,
        role: "user",
        createdAt: new Date(),
      });
    }

    // ✅ RESPONSE OBJECT (IMPORTANT)
    const res = NextResponse.json({ success: true, role });

    // 🔐 SESSION COOKIE (middleware reads this)
    res.cookies.set("__session", token, {
  httpOnly: true,
  path: "/",
  secure: true,
  sameSite: "lax",
});

res.cookies.set("role", role, {
  path: "/",
  secure: true,
  sameSite: "lax",
});

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}


import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseAdminApp } from "@/firebase/adminConfig";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }

    // 🔐 Verify Firebase token
    const decoded = await getAuth(firebaseAdminApp).verifyIdToken(token);
    const db = getFirestore(firebaseAdminApp);

    const uid = decoded.uid;
    const email = decoded.email ?? "";

   // 🔎 Check user in Firestore
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

    const cookieStore = cookies();

    // 🔐 Session cookie
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

import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();

    const user = await getAuth(firebaseAdminApp).getUserByEmail(email);

    await getAuth(firebaseAdminApp).setCustomUserClaims(user.uid, {
      role,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to set role" }, { status: 500 });
  }
}

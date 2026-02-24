import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export async function POST() {
  const email = "tinkusarkar.business@gmail.com";

  const user = await getAuth(firebaseAdminApp).getUserByEmail(email);

  await getAuth(firebaseAdminApp).setCustomUserClaims(user.uid, {
    role: "superadmin",
  });

  return NextResponse.json({ success: true });
}

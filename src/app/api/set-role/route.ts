import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export async function POST(req: Request) {
  try {
    const session = cookies().get("__session")?.value;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await getAuth(firebaseAdminApp).verifyIdToken(session);

    // ✅ Only superadmin can set roles
    if (decoded.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

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

export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseAdminApp } from "@/lib/firebaseAdmin";

export default async function AuthRedirect() {
  const cookieStore = cookies();
  const session = cookieStore.get("__session")?.value;

  if (!session) {
    redirect("/login");
  }

  try {
    const decoded = await getAuth(firebaseAdminApp).verifySessionCookie(session, true);

    const db = getFirestore(firebaseAdminApp);
    const userDoc = await db.collection("users").doc(decoded.uid).get();

    const role = userDoc.data()?.role;

    if (role === "superadmin") {
      redirect("/admin");
    } else {
      redirect("/dashboard");
    }

  } catch (error) {
    redirect("/login");
  }
}

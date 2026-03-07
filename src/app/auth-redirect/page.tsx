export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export default async function AuthRedirect() {
  const token = cookies().get("__session")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = await getAuth(firebaseAdminApp).verifySessionCookie(token, true);

    const email = decoded.email;

    // 👑 Owner
    if (email === "tinkusarkar.business@gmail.com") {
      redirect("/admin/dashboard");
    }

    // 👤 Normal user
    redirect("/dashboard");

  } catch {
    redirect("/login");
  }
}

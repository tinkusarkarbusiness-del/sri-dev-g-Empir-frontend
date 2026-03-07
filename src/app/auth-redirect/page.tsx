export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export default async function AuthRedirect() {
  const session = cookies().get("__session")?.value;

  if (!session) {
    redirect("/login");
  }

  try {
    const decoded = await getAuth(firebaseAdminApp)
      .verifySessionCookie(session, true);

    const email = decoded.email;

    // OWNER EMAIL
    if (email === "tinkusarkar.business@gmail.com") {
      redirect("/admin");
    }

    // NORMAL USER
    redirect("/dashboard");

  } catch (error) {
    redirect("/login");
  }
}

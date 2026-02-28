import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export default async function AuthRedirect() {
  const session = cookies().get("__session")?.value;

  if (!session) redirect("/login");

  try {
    const decoded = await getAuth(firebaseAdminApp)
      .verifySessionCookie(session, true);

    // 🔐 Role based redirect
    if (decoded.role === "superadmin") {
      redirect("/admin/dashboard");
    }

    if (decoded.role === "admin") {
      redirect("/admin/dashboard");
    }

    // Default user
    redirect("/dashboard");

  } catch {
    redirect("/login");
  }
}

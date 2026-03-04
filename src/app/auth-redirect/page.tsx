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

    if (decoded.role === "admin" || decoded.role === "superadmin") {
      redirect("/admin/dashboard");
    }

    redirect("/dashboard");

  } catch {
    redirect("/login");
  }
}

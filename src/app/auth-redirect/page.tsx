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
    const decoded = await getAuth(firebaseAdminApp).verifyIdToken(token);

    if (decoded.role === "superadmin") {
      redirect("/admin/dashboard");
    }

    if (decoded.role === "admin") {
      redirect("/admin/dashboard");
    }

    redirect("/dashboard");

  } catch (error) {
    redirect("/login");
  }
}

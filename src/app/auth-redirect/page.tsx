export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthRedirect() {
  const session = cookies().get("__session")?.value;

  if (!session) {
    redirect("/login");
  }

  // Temporary test
  redirect("/admin");
}

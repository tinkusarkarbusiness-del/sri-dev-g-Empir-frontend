// login-success.ts (example)

import { useRouter } from "next/navigation";

const OWNER_EMAIL = "tinkusarkar.basiness@email.com";

export function handleLoginSuccess(user: any) {
  const router = useRouter();

  const email = user.email;

  // OWNER CHECK
  if (email === OWNER_EMAIL) {
    localStorage.setItem("role", "admin");
    localStorage.setItem("email", email);

    router.replace("/admin/dashboard"); // 🔥 CONTROL ROOM
  } else {
    localStorage.setItem("role", "user");
    localStorage.setItem("email", email);

    router.replace("/dashboard"); // 👤 USER DASHBOARD
  }
}

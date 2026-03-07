"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase/client";

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {

      if (!user) {
        router.push("/login");
        return;
      }

      // 👑 owner email
      if (user.email === "tinkusarkar.business@gmail.com") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }

    });

    return () => unsub();
  }, [router]);

  return <p>Redirecting...</p>;
}

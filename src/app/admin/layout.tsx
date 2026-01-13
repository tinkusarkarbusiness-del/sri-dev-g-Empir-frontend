"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppLayout } from "@/components/app/app-layout";
import { adminNavLinks } from "@/lib/data";

const OWNER_EMAIL = "tinkusarkar.basiness@email.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (role !== "admin" || email !== OWNER_EMAIL) {
      localStorage.clear();
      router.replace("/login");
    }
  }, [router]);

  const getPageTitle = () => {
    const current = adminNavLinks.find((l) =>
      pathname.startsWith(l.href)
    );
    return current?.label ?? "Empire Control Room";
  };

  return (
    <AppLayout navLinks={adminNavLinks} pageTitle={getPageTitle()}>
      {children}
    </AppLayout>
  );
}

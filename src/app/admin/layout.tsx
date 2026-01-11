"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppLayout } from "@/components/app/app-layout";
import { adminNavLinks } from "@/lib/data";

const OWNER_EMAIL = "tinkusarkar.basiness@email.com"; // 🔴 yahan apna real email daalo

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

    // 🔐 DOUBLE SECURITY CHECK
    if (role !== "admin" || email !== OWNER_EMAIL) {
      localStorage.clear(); // optional but recommended
      router.replace("/login");
    }
  }, [router]);

  const getPageTitle = () => {
    const currentLink = adminNavLinks.find((link) =>
      pathname.startsWith(link.href)
    );
    if (currentLink) return currentLink.label;
    if (pathname === "/admin/dashboard") return "Global KPIs";
    return "Empire Control Room";
  };

  return (
    <AppLayout navLinks={adminNavLinks} pageTitle={getPageTitle()}>
      {children}
    </AppLayout>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppLayout } from "@/components/app/app-layout";
import { adminNavLinks } from "@/lib/data";

const OWNER_EMAIL = "tinkusarkar.basiness@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (role === "admin" && email === OWNER_EMAIL) {
      setChecked(true); // ✅ allow render
    } else {
      localStorage.clear();
      router.replace("/login");
    }
  }, [router]);

  if (!checked) return null; // ⛔ white screen crash STOP

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

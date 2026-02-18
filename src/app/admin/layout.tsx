"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppLayout } from "@/components/app/app-layout";
import { adminNavLinks } from "@/lib/data";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const role = Cookies.get("role");

    if (role === "admin") {
      setChecked(true); // ✅ allow render
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!checked) return null; // ⛔ stop white screen

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

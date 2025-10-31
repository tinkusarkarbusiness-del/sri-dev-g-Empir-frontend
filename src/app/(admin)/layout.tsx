"use client"

import { usePathname } from 'next/navigation';
import { AppLayout } from '@/components/app/app-layout';
import { adminNavLinks } from '@/lib/data';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    const currentLink = adminNavLinks.find(link => pathname.startsWith(link.href));
    if (currentLink) return currentLink.label;
    if (pathname === '/admin/dashboard') return 'Global KPIs';
    return 'Empire Control Room';
  }

  return (
    <AppLayout navLinks={adminNavLinks} pageTitle={getPageTitle()}>
      {children}
    </AppLayout>
  );
}

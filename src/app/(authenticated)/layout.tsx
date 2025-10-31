"use client"

import { usePathname } from 'next/navigation';
import { AppLayout } from '@/components/app/app-layout';
import { appNavLinks } from '@/lib/data';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const getPageTitle = () => {
    // Handle module pages
    if (pathname.startsWith('/modules/')) {
        return "Module Details";
    }
    const currentLink = appNavLinks.find(link => pathname.startsWith(link.href));
    return currentLink ? currentLink.label : 'Dashboard';
  }

  return (
    <AppLayout navLinks={appNavLinks} pageTitle={getPageTitle()}>
      {children}
    </AppLayout>
  );
}

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
    if (currentLink) {
        // Special case for full-screen mirror page
        if (currentLink.href === '/mirror') return '';
        return currentLink.label;
    }
    return 'Dashboard';
  }

  const pageTitle = getPageTitle();

  if (pathname.startsWith('/mirror')) {
    return (
         <AppLayout navLinks={appNavLinks} pageTitle={pageTitle} hideHeader>
            {children}
        </AppLayout>
    )
  }

  return (
    <AppLayout navLinks={appNavLinks} pageTitle={pageTitle}>
      {children}
    </AppLayout>
  );
}

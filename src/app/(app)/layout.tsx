"use client"

import { usePathname } from 'next/navigation';
import { AppLayout } from '@/components/app/app-layout';
import { appNavLinks } from '@/lib/data';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentLink = appNavLinks.find(link => pathname.startsWith(link.href));
  const pageTitle = currentLink ? currentLink.label : 'Dashboard';

  return (
    <AppLayout navLinks={appNavLinks} pageTitle={pageTitle}>
      {children}
    </AppLayout>
  );
}

"use client";

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { usePathname } from 'next/navigation';
import { AppLayout } from '@/components/app/app-layout';
import { appNavLinks } from '@/lib/data';

// This is a workaround to prevent build errors.
// export const metadata: Metadata = {
//   title: 'SriDev Empire',
//   description: 'The visual UI blueprint for SriDev Empire.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>SriDev Empire</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          {children}
          <Toaster />
      </body>
    </html>
  );
}

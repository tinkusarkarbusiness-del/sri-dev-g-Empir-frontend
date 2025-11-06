"use client";

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Poppins, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import { cn } from '@/lib/utils';

// This is a workaround to prevent build errors.
// export const metadata: Metadata = {
//   title: 'SriDev Empire',
//   description: 'The visual UI blueprint for SriDev Empire.',
// };

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-headline',
});

const fontSpaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-body',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>SriDev Empire</title>
      </head>
      <body className={cn("font-body antialiased", fontPoppins.variable, fontSpaceGrotesk.variable)}>
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
          <Toaster />
      </body>
    </html>
  );
}

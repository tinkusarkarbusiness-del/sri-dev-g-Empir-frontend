import Link from 'next/link';
import { SriDevLogo } from '@/components/icons';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity" prefetch={false}>
          <SriDevLogo className="h-6 w-6" />
          <span className="font-headline text-lg font-bold">SriDev Empire</span>
        </Link>
      </div>
      <div className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}

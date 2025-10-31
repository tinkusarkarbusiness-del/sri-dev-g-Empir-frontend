import Link from "next/link";
import { SriDevLogo } from "./icons";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <SriDevLogo className="h-8 w-8" />
              <span className="font-headline text-lg font-bold text-primary">SriDev Empire</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your 6-in-1 spiritual and business toolkit, powered by divine AI.
            </p>
          </div>
          <div className="grid gap-2 text-sm">
            <h3 className="font-headline font-semibold">Modules</h3>
            <Link href="/login" className="text-muted-foreground hover:text-primary" prefetch={false}>
              AI Doll Companion
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-primary" prefetch={false}>
              Divine Mirror
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-primary" prefetch={false}>
              Future Predictor
            </Link>
          </div>
          <div className="grid gap-2 text-sm">
            <h3 className="font-headline font-semibold">Legal</h3>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              Terms of Service
            </Link>
          </div>
          <div className="grid gap-2 text-sm">
            <h3 className="font-headline font-semibold">Follow Us</h3>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SriDev Empire. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

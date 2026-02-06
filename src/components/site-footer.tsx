import Link from "next/link";
import { SriDevLogo } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card mt-16">
      <div className="container mx-auto px-4 py-10">

        {/* Logo + Brand */}
        <div className="flex flex-col items-center text-center space-y-3">
          <SriDevLogo className="h-8 w-8 opacity-90" />

          <h2 className="text-xl font-semibold tracking-wide">
            Sri Dev G Empire™
          </h2>

          <p className="text-sm text-muted-foreground">
            Divine Intelligence Network
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">

          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>

          <Link href="/about" className="hover:text-primary transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-primary transition">
            Contact
          </Link>

          <Link href="/privacy-policy" className="hover:text-primary transition">
            Privacy Policy
          </Link>

          <Link href="/terms" className="hover:text-primary transition">
            Terms
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sri Dev G Empire™. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

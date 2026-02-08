import Link from "next/link";
import { SriDevLogo } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t mt-16 bg-gradient-to-b from-[#0b0b0f] to-[#111118]">
      <div className="container mx-auto px-4 py-12">
        
          <h2 className="text-xl font-semibold tracking-wide text-yellow-400">
            🔱 Sri Dev G Empire™
          </h2>

          <p className="text-sm text-yellow-200/70">
            Divine Intelligence Network
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8 mt-8 text-sm font-medium flex-wrap">

          <Link href="/" className="text-yellow-300 hover:text-yellow-400 hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] transition">
            Home
          </Link>

          <Link href="/about" className="text-yellow-300 hover:text-yellow-400 hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] transition">
            About
          </Link>

          <Link href="/contact" className="text-yellow-300 hover:text-yellow-400 hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] transition">
            Contact
          </Link>

          <Link href="/privacy-policy" className="text-yellow-300 hover:text-yellow-400 hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] transition">
            Privacy Policy
          </Link>

          <Link href="/terms" className="text-yellow-300 hover:text-yellow-400 hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] transition">
            Terms
          </Link>
        </div>

        {/* Divider Glow Line */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

        {/* Copyright */}
        <div className="text-center mt-6 text-xs text-yellow-200/70">
          © {new Date().getFullYear()} Sri Dev G Empire™. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

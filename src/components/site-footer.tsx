import Link from "next/link";
import { SriDevLogo } from "./icons";

export function SiteFooter() {
  return (
    <footer className="relative mt-16 text-center overflow-hidden border-t border-yellow-500/20">

      {/* 🌟 Golden Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-80"></div>

      {/* 🌊 Water Flow Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,#0a0a0a,#0f172a,#0a0a0a)]">
        <div className="absolute inset-0 opacity-20 animate-water"></div>
      </div>

      <div className="container mx-auto px-4 py-10">

        {/* Logo */}
        <div className="flex flex-col items-center space-y-3">
          <SriDevLogo className="h-9 w-9 text-yellow-400" />

          <h2 className="text-xl font-semibold text-yellow-300 tracking-wide">
            Sri Dev G Empire™
          </h2>

          <p className="text-sm text-yellow-200/70">
            Divine Intelligence Network
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <Link href="/" className="text-yellow-200 hover:text-yellow-400 transition">Home</Link>
          <Link href="/about" className="text-yellow-200 hover:text-yellow-400 transition">About</Link>
          <Link href="/contact" className="text-yellow-200 hover:text-yellow-400 transition">Contact</Link>
          <Link href="/privacy-policy" className="text-yellow-200 hover:text-yellow-400 transition">Privacy</Link>
          <Link href="/terms" className="text-yellow-200 hover:text-yellow-400 transition">Terms</Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-xs text-yellow-200/60">
          © {new Date().getFullYear()} Sri Dev G Empire™. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}


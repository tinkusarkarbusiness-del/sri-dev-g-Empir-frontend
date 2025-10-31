"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, Sun, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black via-gray-900 to-black shadow-lg border-b border-yellow-500/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 🌟 Brand Logo + Name */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sun className="text-yellow-400 animate-spin-slow" size={20} />
            <Link href="/" className="flex items-center gap-2">
                <h1 className="text-yellow-400 text-lg sm:text-xl font-extrabold tracking-wider drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
                Sri Dev G™ Empire
                </h1>
                <Crown className="text-yellow-500 ml-1" size={18} />
            </Link>
          </motion.div>

          {/* 🔱 Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6 text-yellow-300 text-sm font-medium">
            <Link href="#features" className="hover:text-yellow-400 transition">Features</Link>
            <Link href="#temple" className="hover:text-yellow-400 transition">Temple Mode</Link>
            <Link href="#mirror" className="hover:text-yellow-400 transition">AI Mirror</Link>
            <Link href="#prediction" className="hover:text-yellow-400 transition">Prediction</Link>
            <Link href="#wallet" className="hover:text-yellow-400 transition">Wallet</Link>
          </nav>

          {/* ⚙️ Buttons */}
          <div className="flex items-center gap-3">
            <Button asChild className="bg-yellow-500/20 border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black rounded-2xl px-4 py-1 text-sm">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-2xl px-4 py-1 text-sm hover:scale-105 transition">
              <Link href="/signup">Join Empire</Link>
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
}
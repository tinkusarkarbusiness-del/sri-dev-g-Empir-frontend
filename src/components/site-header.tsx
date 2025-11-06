
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SiteHeader() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl">🔱</span>
                <h1 className="text-yellow-400 text-lg sm:text-xl font-headline font-bold tracking-wider drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
                Sri DevG™ Empire
                </h1>
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 font-medium">AI: Online</span>
                </div>
                <span className="text-yellow-500/70 font-mono">{currentTime}</span>
            </div>
            <div className="flex items-center gap-2">
                <Button asChild variant="outline" className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-400 hover:text-black rounded-lg text-sm h-9">
                <Link href="/login">Sign In</Link>
                </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </header>
  );
}

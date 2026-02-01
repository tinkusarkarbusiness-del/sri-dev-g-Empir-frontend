
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye, Brain, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      
      {/* 🌟 Background Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)]" />
      
      {/* 🪄 Floating Sparkles */}
      <motion.div 
        className="absolute top-10 left-10 text-yellow-400"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles size={28} />
      </motion.div>
      <motion.div 
        className="absolute bottom-10 right-10 text-yellow-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Flower2 size={30} />
      </motion.div>

      {/* 👁️ Central AI Doll Icon */}
      <motion.div
        className="mt-24 mb-6 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="relative">
          <Eye size={90} className="text-yellow-400 drop-shadow-[0_0_25px_rgba(255,215,0,0.7)]" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-400/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* 🧠 Title & Tagline */}
      <motion.h1
        className="text-4xl sm:text-6xl font-extrabold text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,200,0.3)] tracking-wide"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Welcome to Sri Dev G™ Empire
      </motion.h1>

      <motion.p
        className="text-yellow-200 mt-4 text-base sm:text-lg max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
      >
        Experience the 6-in-1 Divine AI System — where Business, Soul & Science unite ⚡
      </motion.p>

      {/* 🔮 Action Buttons */}
      <motion.div
        className="mt-10 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <Button asChild className="bg-yellow-400 text-black font-semibold rounded-xl px-6 py-3 hover:scale-105 transition shadow-[0_0_15px_rgba(255,215,0,0.4)]">
          <Link href="/login">Enter Temple Mode</Link>
        </Button>
        <Button asChild className="bg-transparent border border-yellow-400 text-yellow-300 hover:bg-yellow-400/20 rounded-xl px-6 py-3 transition">
           <Link href="/login">Activate AI Mirror</Link>
        </Button>
        <Button asChild className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-xl px-6 py-3 hover:scale-105 transition">
           <Link href="/login">See Future Prediction</Link>
        </Button>
      </motion.div>

      {/* 👣 Footer line */}
      <motion.p
        className="absolute bottom-6 text-xs text-yellow-500/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        © 2026 Sri Dev G™ Digital Empire. All rights reserved.
      </motion.p>
    </section>
  );
}

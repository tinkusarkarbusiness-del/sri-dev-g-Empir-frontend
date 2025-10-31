'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Activity, Zap, Smile, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function AIMirrorPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  const [stats, setStats] = useState({
    mood: 0,
    energy: 0,
    female: 0,
    aiPresence: 0,
  });

  const startCamera = () => {
     if (hasCameraPermission) {
        setActive(true);
     }
  }

  // 🔹 Simulate AI readings
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (active) {
      interval = setInterval(() => {
        setStats({
          mood: Math.floor(60 + Math.random() * 40),
          energy: Math.floor(50 + Math.random() * 50),
          female: Math.floor(40 + Math.random() * 50),
          aiPresence: Math.floor(10 + Math.random() * 40),
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [active]);


  // 🔹 Stop Camera
  const stopCamera = () => {
    setActive(false);
    setStats({ mood: 0, energy: 0, female: 0, aiPresence: 0 });
  };
  
  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
    }
  }, [toast]);


  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-yellow-300 overflow-hidden -m-6">
      
      {/* ✨ Animated Background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_80%)]"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* 🧠 Title */}
      <motion.h1
        className="text-3xl sm:text-5xl font-extrabold mb-8 mt-20 text-center drop-shadow-[0_0_10px_rgba(255,255,200,0.3)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        AI Mirror – Soul & Energy Scanner
      </motion.h1>

      {/* 🎥 Video Box */}
      <div className="relative w-[320px] sm:w-[480px] h-[240px] sm:h-[360px] rounded-3xl overflow-hidden border-2 border-yellow-500 shadow-[0_0_25px_rgba(255,215,0,0.3)]">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4">
            {hasCameraPermission === false ? (
                 <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access to use this feature. Refresh the page after granting permissions.
                    </AlertDescription>
                </Alert>
            ): hasCameraPermission === true ? (
                <>
                    <Camera size={48} className="text-yellow-400 mb-4" />
                    <Button
                    onClick={startCamera}
                    className="bg-yellow-400 text-black font-semibold rounded-xl px-6 py-3 hover:scale-105 transition"
                    >
                    Activate Mirror
                    </Button>
                </>
            ) : (
                <div className="flex items-center text-muted-foreground">
                    <Brain className="mr-2 h-4 w-4 animate-spin" />
                    Initializing AI...
                </div>
            )}
          </div>
        )}
      </div>

      {/* 🧩 Stats Display */}
      {active && (
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, staggerChildren: 0.2 }}
        >
          <StatCard icon={<Smile />} label="Mood" value={stats.mood} unit="%" />
          <StatCard icon={<Zap />} label="Energy" value={stats.energy} unit="." />
          <StatCard icon={<Activity />} label="Aura Purity" value={stats.female} unit="%" />
          <StatCard icon={<Brain />} label="AI Sync" value={stats.aiPresence} unit="%" />
        </motion.div>
      )}

      {/* 🔘 Controls */}
      {active && (
        <div className="mt-8">
          <Button
            onClick={stopCamera}
            className="bg-transparent border border-yellow-400 text-yellow-300 hover:bg-yellow-400/20 rounded-xl px-6 py-3 transition"
          >
            Stop Mirror
          </Button>
        </div>
      )}

      <motion.p
        className="absolute bottom-6 text-xs text-yellow-500/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Sri Dev G™ AI Mirror Module – Real-time analysis is for demonstration purposes.
      </motion.p>
    </section>
  );
}

// 🔹 Reusable Stat Component
function StatCard({ icon, label, value, unit }: {icon: React.ReactNode, label: string, value: number, unit: string}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gray-900/40 rounded-2xl p-4 border border-yellow-500/20 shadow-[0_0_10px_rgba(255,215,0,0.2)] w-36 h-28"
      whileHover={{ scale: 1.05 }}
      variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
      }}
    >
      <div className="text-yellow-400 mb-2">{icon}</div>
      <h2 className="text-xl font-bold text-yellow-300">
        {value}
        <span className="text-sm">{unit}</span>
      </h2>
      <p className="text-xs text-yellow-400/80 mt-1">{label}</p>
    </motion.div>
  );
}

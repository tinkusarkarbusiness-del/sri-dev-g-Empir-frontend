 
'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

import { auth, db } from "@/firebase/client";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "react-firebase-hooks/auth";

const OWNER_EMAIL = "tinkusarkar.basiness@gmail.com";

export default function SatpudaLogin() {
  const mountRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLCanvasElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const [user] = useAuthState(auth);

  /* ---------------- THREE.JS GLOBE ---------------- */
  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 0, 6);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const geometry = new THREE.SphereGeometry(1.9, 64, 64);
    const globe = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: 0x00ff88,
        emissiveIntensity: 0.05,
        transparent: true,
        opacity: 0.6,
      })
    );

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0x00ff88, opacity: 0.25, transparent: true })
    );

    scene.add(globe);
    scene.add(wireframe);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      wireframe.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  /* ---------------- PARTICLES ---------------- */
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = canvas.clientWidth;
    let h = canvas.height = canvas.clientHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.6 + 0.2,
    }));

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
        ctx.fillStyle = `rgba(255,215,0,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(id);
  }, []);

  /* ---------------- AUTH LOGIC ---------------- */

  const saveUser = async (u: any) => {
    await setDoc(
      doc(db, "users", u.uid),
      {
        uid: u.uid,
        email: u.email,
        name: u.displayName || "",
        role: u.email === OWNER_EMAIL ? "admin" : "user",
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await saveUser(result.user);
      router.replace(result.user.email === OWNER_EMAIL ? "/admin/dashboard" : "/dashboard");
    } catch {
      toast({ variant: "destructive", title: "Google login failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    try {
      setLoading(true);

      const cred =
        mode === "signup"
          ? await createUserWithEmailAndPassword(auth, email, password)
          : await signInWithEmailAndPassword(auth, email, password);

      await saveUser(cred.user);
      router.replace(cred.user.email === OWNER_EMAIL ? "/admin/dashboard" : "/dashboard");
    } catch (e: any) {
      toast({ variant: "destructive", title: e.message });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div ref={mountRef} className="absolute inset-y-0 left-0 w-2/3" />
      <canvas ref={particleRef} className="absolute inset-0" />

      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[420px] z-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/60 backdrop-blur border border-yellow-500/40 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </h2>

          <input
            className="w-full mb-3 p-3 bg-transparent border border-yellow-700 rounded"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full mb-4 p-3 bg-transparent border border-yellow-700 rounded"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

          <button
            onClick={handleEmailAuth}
            disabled={loading}
            className="w-full py-3 bg-yellow-400 text-black font-bold rounded mb-3"
          >
            {loading ? "Processing..." : mode === "signup" ? "Sign Up" : "Login"}
          </button>

          <button
            onClick={handleGoogle}
            className="w-full py-3 border border-yellow-700 rounded"
          >
            Continue with Google
          </button>

          <p
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="mt-4 text-xs text-center cursor-pointer text-yellow-400"
          >
            Switch to {mode === "signup" ? "Login" : "Sign Up"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

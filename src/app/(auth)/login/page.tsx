'use client';
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

import { auth, db } from "@/firebase/client";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { doc as firestoreDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
const OWNER_EMAIL = "tinkusarkar.basiness@gmail.com";

export default function SatpudaLogin() {
  const mountRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLCanvasElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signup'); // 'signup' or 'login'
  const [loading, setLoading] = useState(false);
  const { auth, firestore } = useFirebase();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  // Three.js globe
  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: THREE.WebGLRenderer,
      scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      globe: THREE.Mesh,
      frameId: number;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    mountRef.current.appendChild(renderer.domElement);

    // Scene + Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffd27f, 0.6);
    dir.position.set(5, 3, 5);
    scene.add(dir);

    // Globe geometry
    const geometry = new THREE.SphereGeometry(1.9, 64, 64);

    // Wireframe globe material (neon green lines)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.1,
      roughness: 0.4,
      emissive: 0x00ff88,
      emissiveIntensity: 0.02,
      transparent: true,
      opacity: 0.6,
    });

    globe = new THREE.Mesh(geometry, mat);
    scene.add(globe);

    // Wireframe overlay
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({
        color: 0x00ff88,
        linewidth: 1,
        transparent: true,
        opacity: 0.25,
      })
    );
    scene.add(wireframe);

    // Animated atmosphere ring
    const ringGeo = new THREE.RingGeometry(2.05, 2.12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.06,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.1;
    scene.add(ring);

    // simple stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 600;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++)
      positions[i] = (Math.random() - 0.5) * 60;
    starsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0xffd700,
      transparent: true,
      opacity: 0.06,
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Animation
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      globe.rotation.y += 0.0025;
      wireframe.rotation.y += 0.003;
      ring.rotation.z += 0.0015;
      starField.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    const mountRefCurrent = mountRef.current;
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (mountRefCurrent) {
        mountRefCurrent.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Particle canvas (foreground motion)
  useEffect(() => {
    if (!particleRef.current) return;
    const canvas = particleRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: any[] = [];
    let w: number, h: number;
    let animationFrameId: number;

    const init = () => {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          alpha: Math.random() * 0.6 + 0.2,
        });
      }
    };
    init();

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,215,0,${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const onResize = () => init();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Auth handlers
const handleGoogle = async () => {
  try {
    setLoading(true);

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const u = result.user;

    const token = await u.getIdToken();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();

    if (data.role === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/dashboard");
    }

    const userDocRef = doc(firestore, 'users', u.uid);
    setDocumentNonBlocking(
      userDocRef,
      {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        createdAt: new Date(),
      },
      { merge: true }
    );

  } catch (err) {
    console.error(err);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Google sign-in failed",
    });
  } finally {
    setLoading(false);
  }
};


  const handleSignUp = async () => {
    if (!email || !password) {
        toast({
            variant: "destructive",
            title: "Missing fields",
            description: "Please enter both email and password.",
        });
        return;
    }
    try {
      setLoading(true);
      initiateEmailSignUp(auth, email, password);
    } catch (err) {
      console.error(err);
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Sign up failed: " + (err as Error).message,
        });
    } finally {
        setLoading(false);
    }
  };

  const handleLogin = async () => {
     if (!email || !password) {
        toast({
            variant: "destructive",
            title: "Missing fields",
            description: "Please enter both email and password.",
        });
        return;
    }
    try {
      setLoading(true);
      initiateEmailSignIn(auth, email, password);
    } catch (err) {
      console.error(err);
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Login failed",
        });
    } finally {
        setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const greeting = user
    ? ` Jai Satpuda! Welcome back, ${user.displayName || user.email}`
    : 'Welcome to Sri Dev Empire — Join the Divine Network';

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden font-sans">
      <div
        ref={mountRef}
        className="absolute left-0 top-0 w-2/3 h-full pointer-events-none"
      />

      <canvas
        ref={particleRef}
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
      />

      <div className="absolute top-6 left-8 z-30 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-yellow-400 flex items-center justify-center shadow-2xl">
          <span className="text-black font-bold text-lg">🔱</span>
        </div>
        <div className="text-white">
          <div className="text-lg font-bold">SriDev Empire</div>
          <div className="text-xs opacity-70">Satpuda Engine v2.0</div>
        </div>
      </div>

      <div className="absolute right-0 md:right-12 top-1/2 transform -translate-y-1/2 z-40 w-full md:w-[420px] p-4 md:p-0">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-md bg-black/60 border border-yellow-500/50 rounded-2xl p-8 shadow-2xl"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-extrabold text-yellow-400">
              {mode === 'signup' ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-white/70">
              {mode === 'signup'
                ? 'Join the empire and unlock your potential.'
                : 'Enter your credentials to access the empire.'}
            </p>
          </div>

          <div className="space-y-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-md bg-transparent border border-yellow-800 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full p-3 rounded-md bg-transparent border border-yellow-800 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  mode === 'signup' ? handleSignUp() : handleLogin()
                }
                disabled={loading}
                className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg disabled:opacity-50"
              >
                {loading ? 'Processing...' : (mode === 'signup' ? 'Sign Up with Email' : 'Login')}
              </motion.button>
              <button
                onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                className="px-3 py-3 rounded-lg border border-yellow-700 text-yellow-400"
              >
                {mode === 'signup' ? 'Switch to Login' : 'Switch to Sign Up'}
              </button>
            </div>

            <div className="py-2 text-center">
              <div className="mb-2 text-xs text-white/60">
                OR CONTINUE WITH
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleGoogle}
                disabled={loading}
                className="w-full py-3 rounded-md border border-yellow-700 bg-black/40 text-white font-medium disabled:opacity-50"
              >
                <span className="mr-2">G</span> Continue with Google
              </motion.button>
            </div>

            <div className="text-xs text-white/60">
              By clicking continue, you agree to our{' '}
              <u className="cursor-pointer">Terms of Service</u> and{' '}
              <u className="cursor-pointer">Privacy Policy</u>.
            </div>
          </div>
        </motion.div>

        <div className="mt-6 text-right text-xs text-white/50">
          Sri Dev G Empire™ • Powered by Sri Dev G™
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-30 text-white/70">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="text-sm">🌍 Empowering Digital Souls</div>
          <div className="text-xs opacity-60">
            High-motion Satpuda UI • Globe Animation • Particle Energy
          </div>
        </motion.div>
      </div>
    </div>
  );
}

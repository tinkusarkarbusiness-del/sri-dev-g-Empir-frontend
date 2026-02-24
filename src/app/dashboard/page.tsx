"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setUserData(snap.data());
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {userData?.name}
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl w-96">
        <img
          src={userData?.avatar || "/avatar.png"}
          className="w-20 h-20 rounded-full mb-4"
        />

        <p><strong>User ID:</strong> {userData?.userId}</p>

        <Link
          href="/profile"
          className="inline-block mt-4 bg-yellow-500 px-4 py-2 rounded"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

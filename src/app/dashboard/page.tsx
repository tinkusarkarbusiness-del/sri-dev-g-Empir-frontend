"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/firebase/config"
import { db } from "@/firebase/config"

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false)
        return
      }

      const ref = doc(db, "users", user.uid)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        setUserData(snap.data())
      }

      setLoading(false)
    })

    return () => unsub()
  }, [])

  if (loading) return <p>Loading...</p>
  if (!userData) return <p>No Firestore data found</p>

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">Welcome, {userData.name}</h1>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
    </div>
  )
}

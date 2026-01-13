"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/auth"
import { db } from "@/firebase/config"
import { doc, getDoc, setDoc } from "firebase/firestore"

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    const loadUser = async () => {
      const ref = doc(db, "users", user.uid)
      const snap = await getDoc(ref)

      if (!snap.exists()) {
        await setDoc(ref, {
          name: user.displayName ?? "User",
          email: user.email,
          role: "user",
          walletBalance: 0,
          createdAt: new Date()
        })
        setUserData({
          name: user.displayName,
          email: user.email,
          walletBalance: 0
        })
      } else {
        setUserData(snap.data())
      }
    }

    loadUser()
  }, [])

  if (!userData) return <p>Loading...</p>

  return (
    <div>
      <h2>Welcome, {userData.name}</h2>
      <p>Wallet Balance: ₹{userData.walletBalance}</p>
    </div>
  )
}

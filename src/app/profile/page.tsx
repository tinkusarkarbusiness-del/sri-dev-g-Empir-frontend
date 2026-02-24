"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/client";
import { db } from "@/firebase/client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const storage = getStorage();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setName(snap.data().name);
        setAvatar(snap.data().avatar);
      }
    };

    fetchData();
  }, []);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const user = auth.currentUser;
    if (!file || !user) return;

    const storageRef = ref(storage, `avatars/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", user.uid), {
      avatar: url,
    });

    setAvatar(url);
    alert("Profile updated!");
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Edit Profile</h1>

      <img
        src={avatar || "/avatar.png"}
        className="w-24 h-24 rounded-full mb-4"
      />

      <input
        type="file"
        onChange={handleUpload}
        className="mb-4"
      />

      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
      </div>
    </div>
  );
}

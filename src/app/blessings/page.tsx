"use client";
import { useEffect, useState } from "react";

export default function BlessingsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/blessing")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🛕 Divine Blessing</h1>

      <h2>Type: {data.type}</h2>
      <h3>Growth Score: {data.score}</h3>

      <p style={{ fontSize: 18, marginTop: 20 }}>{data.message}</p>
    </div>
  );
}


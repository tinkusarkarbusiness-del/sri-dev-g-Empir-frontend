"use client";
import { useState } from "react";

export default function CheckinPage() {
  const [form, setForm] = useState({
    mood: 5,
    discipline: 5,
    action: 5,
    distraction: 5,
    spiritual: 5,
    business: 5,
  });

  async function submit() {
    await fetch("/api/checkin", {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Data Saved");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Daily Check-In</h1>

      {Object.keys(form).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="number"
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: Number(e.target.value) })
            }
          />
        </div>
      ))}

      <button onClick={submit}>Submit</button>
    </div>
  );
}

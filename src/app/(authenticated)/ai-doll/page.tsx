"use client";

import { useState } from "react";

export default function AIDollPage() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const sendMessage = async () => {

    if (!message) return;

    const newChat = [...chat, "You: " + message];

    const res = await fetch("/api/ai-doll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    newChat.push("AI Doll: " + data.reply);

    setChat(newChat);
    setMessage("");
  };

  return (
    <div className="p-6 flex flex-col items-center">

      <h1 className="text-3xl font-bold mb-6">AI Doll Companion</h1>

      <img
        src="/ai-doll.png"
        alt="AI Doll companion"
        className="rounded-2xl w-80"
      />

      <div className="mt-6 w-full max-w-md bg-black/30 p-4 rounded-xl">

        <div className="h-40 overflow-y-auto mb-4 text-sm space-y-2">
          {chat.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>

        <div className="flex gap-2">

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Talk to AI Doll..."
            className="flex-1 p-2 rounded bg-gray-800"
          />

          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-yellow-500 rounded"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

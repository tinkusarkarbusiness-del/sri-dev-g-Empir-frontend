"use client"

import { useState } from "react"

export default function AIDollPage() {

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<string[]>([])

  const sendMessage = async () => {

    if (!message) return

    const newChat = [...chat, "You: " + message]

    const res = await fetch("/api/ai-doll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    })

    const data = await res.json()

    newChat.push("AI Doll: " + data.reply)

    setChat(newChat)
    setMessage("")
  }

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold">AI Doll Companion</h1>

      <div className="mt-6">
        <img
          src="/ai-doll.png"
          alt="AI Doll"
          className="rounded-2xl w-80"
        />
      </div>

      <div className="mt-6 max-w-md">

        <div className="bg-black/30 p-4 rounded-lg h-48 overflow-y-auto">

          {chat.map((c, i) => (
            <p key={i}>{c}</p>
          ))}

        </div>

        <div className="flex gap-2 mt-3">

          <input
            className="flex-1 p-2 rounded bg-gray-800"
            placeholder="Talk to AI Doll..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
  )
}

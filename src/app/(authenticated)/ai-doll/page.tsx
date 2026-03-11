"use client";

import { useState } from "react";

export default function AIDollPage() {

  const [text, setText] = useState("");
  const [reply, setReply] = useState("");

  function talk() {

    if (text === "hello") {
      setReply("Hello! I am your AI Doll.");
    } 
    else if (text === "blessing") {
      setReply("May happiness and prosperity come to your life.");
    } 
    else if (text === "future") {
      setReply("Your future depends on your actions today.");
    } 
    else {
      setReply("I am here to guide you.");
    }

  }

  return (
    <div className="p-6 text-center">

      <h1 className="text-3xl font-bold mb-6">AI Doll Companion</h1>

      <img
        src="/ai-doll.png"
        className="w-72 mx-auto rounded-xl"
      />

      <div className="mt-6">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Talk to AI Doll..."
          className="p-2 border rounded"
        />

        <button
          onClick={talk}
          className="ml-2 px-4 py-2 bg-yellow-500 rounded"
        >
          Send
        </button>

      </div>

      <p className="mt-6 text-lg">{reply}</p>

    </div>
  );
}

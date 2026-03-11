import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  let reply = "Welcome to Sri Dev G Empire. How can I guide you today?";

  if (message.toLowerCase().includes("blessing")) {
    reply = "May prosperity and peace come into your life.";
  }

  if (message.toLowerCase().includes("future")) {
    reply = "Your future depends on your actions today. Stay focused and positive.";
  }

  if (message.toLowerCase().includes("hello")) {
    reply = "Hello! I am your AI Doll companion.";
  }

  return NextResponse.json({ reply });
}

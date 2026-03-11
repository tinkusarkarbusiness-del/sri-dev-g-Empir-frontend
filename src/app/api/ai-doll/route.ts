import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const { message } = await req.json();

  let reply = "Hello, I am your AI Doll companion.";

  if (message.toLowerCase().includes("hello")) {
    reply = "Hello! How can I help you today?";
  }

  if (message.toLowerCase().includes("future")) {
    reply = "Your future is shaped by your actions today.";
  }

  if (message.toLowerCase().includes("blessing")) {
    reply = "May peace and prosperity come to your life.";
  }

  return NextResponse.json({ reply });
}

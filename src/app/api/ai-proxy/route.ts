// Next.js API route (Vercel serverless)
// Use environment variable OPENAI_API_KEY in Vercel
import {NextRequest, NextResponse} from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: NextRequest) {
  const {prompt} = await req.json();
  if (!prompt) {
    return NextResponse.json({error: 'prompt required'}, {status: 400});
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // replace as needed
        messages: [{role: 'user', content: prompt}],
        max_tokens: 800,
      }),
    });
    const data = await r.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {error: 'Failed to fetch from OpenAI'},
      {status: 500}
    );
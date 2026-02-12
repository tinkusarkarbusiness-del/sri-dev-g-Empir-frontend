import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  cookieStore.set("__session", "", {
    path: "/",
    expires: new Date(0),
  });

  cookieStore.set("role", "", {
    path: "/",
    expires: new Date(0),
  });

  return NextResponse.json({ success: true });
}

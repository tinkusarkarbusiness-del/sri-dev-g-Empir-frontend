import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  const body = await req.json();

  await addDoc(collection(db, "dailyLogs"), {
    ...body,
    createdAt: serverTimestamp(),
  });

  return Response.json({ success: true });
}

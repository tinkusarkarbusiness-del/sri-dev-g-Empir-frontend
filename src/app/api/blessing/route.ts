import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { generateBlessing } from "@/lib/blessingEngine";

export async function GET() {
  const q = query(
    collection(db, "dailyLogs"),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    return Response.json({ message: "No data yet" });
  }

  const data = snap.docs[0].data();

  const blessing = generateBlessing(data);

  return Response.json(blessing);
}

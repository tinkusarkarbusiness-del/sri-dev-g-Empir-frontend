export const dynamic = "force-dynamic";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getFirestore } from "firebase-admin/firestore";
import { firebaseAdminApp } from "@/firebase/adminConfig";

export default async function AdminDashboardPage() {
  const db = getFirestore(firebaseAdminApp);

  // 🔹 Total Users
  const usersSnap = await db.collection("users").get();
  const totalUsers = usersSnap.size;

  // 🔹 Total Revenue (if payments collection exists)
  const paymentsSnap = await db.collection("payments").get();
  let totalRevenue = 0;

  paymentsSnap.forEach((doc) => {
    totalRevenue += doc.data().amount || 0;
  });

  return (
    <div className="animate-in fade-in-50">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalUsers}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalRevenue}
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>AI-Human Ratio Live Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                No Live Data Available
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                No Recent Users Found
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

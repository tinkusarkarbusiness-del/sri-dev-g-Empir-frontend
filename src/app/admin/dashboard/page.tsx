"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/clientConfig";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { kpis } from "@/lib/data";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);

    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  // 🔄 Loading Screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Checking admin access...
      </div>
    );
  }

  // ✅ Real Admin UI
  return (
    <div className="animate-in fade-in-50 p-6">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p
                className={`text-xs ${
                  kpi.change.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>AI-Human Ratio Live Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] bg-muted rounded-lg flex items-center justify-center">
              Live Map Placeholder
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] bg-muted rounded-lg flex items-center justify-center">
              User List Placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminDashboardPage() {
  return (
    <div className="animate-in fade-in-50">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
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
          <CardContent className="pl-2">
            {/* Placeholder for map */}
            <div className="w-full h-[300px] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Live Map Placeholder</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
             {/* Placeholder for recent users */}
             <div className="w-full h-[300px] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">User List Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

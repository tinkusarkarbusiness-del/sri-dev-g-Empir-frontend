import { modules } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bell,
  FileText,
} from 'lucide-react';
import { ActionModal } from '@/components/ai/action-modal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ModulePage({ params }: { params: { slug: string } }) {
  const module = modules.find((m) => m.id === params.slug);

  if (!module) {
    notFound();
  }

  const logs = [
    { time: "2023-10-27 10:00:00", event: "Session Started", details: "User engaged with module." },
    { time: "2023-10-27 10:05:12", event: "AI Suggestion", details: "Meditation action suggested." },
    { time: "2023-10-27 10:15:34", event: "State Change", details: "Mood detected as 'Calm'." },
    { time: "2023-10-27 10:30:00", event: "Session Ended", details: "Duration: 30 minutes." },
  ]

  return (
    <div className="animate-in fade-in-50 space-y-6">
       <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
                <module.icon className="h-8 w-8 text-primary" />
            </div>
            <div>
                <CardTitle className="font-headline text-3xl">{module.title}</CardTitle>
                <CardDescription>{module.shortDescription}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{module.fullDescription}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Sensors</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Stable</div>
            <p className="text-xs text-muted-foreground">Energy levels are balanced</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Reports</div>
            <p className="text-xs text-muted-foreground">3 new this week</p>
          </CardContent>
        </Card>
        {module.id === 'ai-doll-companion' && (
          <Card className="flex flex-col items-center justify-center p-6">
              <CardTitle className="text-lg font-medium mb-4 text-center">Need Guidance?</CardTitle>
              <ActionModal scenario={`User is in the ${module.title} module and needs guidance.`} />
          </Card>
        )}
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Activity Log
          </CardTitle>
          <CardDescription>Recent events from this module.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {logs.map((log, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{log.time}</TableCell>
                        <TableCell>{log.event}</TableCell>
                        <TableCell>{log.details}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}

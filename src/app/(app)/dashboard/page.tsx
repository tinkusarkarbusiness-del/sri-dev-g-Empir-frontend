import Link from 'next/link';
import { modules } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Welcome to your Empire</h2>
        <p className="text-muted-foreground">Here are your tools for spiritual and material mastery.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.id} className="flex flex-col transform hover:-translate-y-1 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/20">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <module.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">{module.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription>{module.fullDescription}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10" asChild>
                <Link href={`/modules/${module.id}`}>
                  Open Module <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

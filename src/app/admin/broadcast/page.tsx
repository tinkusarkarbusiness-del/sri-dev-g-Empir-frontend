
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function BroadcastPage() {
    return (
        <div className="animate-in fade-in-50">
            <Card>
                <CardHeader>
                    <CardTitle>Broadcast Console</CardTitle>
                    <CardDescription>Send messages and push notifications to your users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="target">Target Audience</Label>
                        <Select>
                            <SelectTrigger id="target">
                                <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Users</SelectItem>
                                <SelectItem value="visionary">Visionary Tier</SelectItem>
                                <SelectItem value="ascended">Ascended Tier</SelectItem>
                                <SelectItem value="inactive">Inactive Users</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Notification Title</Label>
                        <Input id="title" placeholder="A divine message awaits..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Compose your broadcast message here." rows={5} />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Schedule</Button>
                    <Button>Send Broadcast</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

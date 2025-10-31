import Image from "next/image";
import {
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { sampleUsers } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Input } from "@/components/ui/input";

export default function AdminUsersPage() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
           <Input placeholder="Search users..." className="h-9 w-[250px]" />
          <Button size="sm" className="h-9 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add User
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage your users and their roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Status
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleUsers.map((user) => {
                  const avatarImage = PlaceHolderImages.find(p => p.id === user.avatar);
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="hidden sm:table-cell">
                        {avatarImage && <Image
                          alt="User avatar"
                          className="aspect-square rounded-full object-cover"
                          height="48"
                          src={avatarImage.imageUrl}
                          width="48"
                          data-ai-hint={avatarImage.imageHint}
                        />}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>{user.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">{user.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Ascended' ? 'default' : 'secondary'} className={user.role === 'Ascended' ? 'bg-primary text-primary-foreground' : ''}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                         <Badge variant={user.status === 'Active' ? 'outline' : 'secondary'} className={user.status === 'Active' ? 'border-green-400 text-green-400' : ''}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>{user.status === 'Active' ? 'Suspend' : 'Unsuspend'}</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

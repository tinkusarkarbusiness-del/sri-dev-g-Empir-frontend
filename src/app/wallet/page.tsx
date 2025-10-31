import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { sampleTransactions } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Download, PlusCircle } from "lucide-react"

export default function WalletPage() {
  return (
    <div className="animate-in fade-in-50 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Empire Wallet</h2>
          <p className="text-muted-foreground">Manage your funds and view transaction history.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Funds
          </Button>
          <Button>
            Withdraw
          </Button>
        </div>
      </div>
      <Card className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold tracking-tighter">₹26,749.00</div>
          <p className="text-sm opacity-80">as of today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Your recent deposits, withdrawals, and purchases.
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={`text-right font-semibold ${transaction.type === 'Debit' ? 'text-destructive' : 'text-green-400'}`}>
                    {transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

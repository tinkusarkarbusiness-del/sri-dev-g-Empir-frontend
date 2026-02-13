"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle } from "lucide-react";

export default function WalletPage() {

  // 🔹 Empty real state (no fake data)
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  return (
    <div className="animate-in fade-in-50 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Empire Wallet</h2>
          <p className="text-muted-foreground">
            Manage your funds and view transaction history.
          </p>
        </div>

        <div className="flex gap-2">
          {/* Add Funds */}
          <Button variant="outline" onClick={() => alert("Add Funds Clicked")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Funds
          </Button>

          {/* Withdraw */}
          <Button onClick={() => alert("Withdraw Clicked")}>
            Withdraw
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold tracking-tighter">
            ₹{balance.toFixed(2)}
          </div>
          <p className="text-sm opacity-80">as of today</p>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Your recent deposits, withdrawals, and purchases.
            </CardDescription>
          </div>

          <Button variant="ghost" size="sm" onClick={() => alert("Export coming soon")}>
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
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No transactions yet
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right">
                      {transaction.amount}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>

          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

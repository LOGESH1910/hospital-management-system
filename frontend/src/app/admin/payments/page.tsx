"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { DollarSign, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";

interface Payment {
  _id: string;
  patient: { name: string };
  amount: number;
  status: string;
  method: string;
  date: string;
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/admin/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPayments([
            { _id: "1", patient: { name: "John Doe" }, amount: 150, status: "SUCCESS", method: "Credit Card", date: "2024-01-15" },
            { _id: "2", patient: { name: "Jane Smith" }, amount: 200, status: "PENDING", method: "Insurance", date: "2024-01-14" },
            { _id: "3", patient: { name: "Bob Johnson" }, amount: 100, status: "FAILED", method: "PayPal", date: "2024-01-13" },
          ]);
        }
      });
  }, []);

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">View and manage all payment transactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Revenue</span>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">$2,850</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" /> +18% from last month</p>
          </div>
        </Card>
        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending</span>
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-yellow-600 mt-1">Awaiting processing</p>
          </div>
        </Card>
        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Failed</span>
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-red-600 mt-1">Needs attention</p>
          </div>
        </Card>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold">All Transactions</h3>
        </div>
        <div className="p-4 space-y-3">
          {payments.map((payment) => (
            <div key={payment._id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{payment.patient.name}</p>
                  <p className="text-xs text-muted-foreground">{payment.method} • {payment.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">${payment.amount}</span>
                <Badge variant={payment.status === "SUCCESS" ? "success" : payment.status === "PENDING" ? "warning" : "error"}>
                  {payment.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
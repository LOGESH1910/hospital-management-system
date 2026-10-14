"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { Bell, Check, MessageSquare, AlertTriangle } from "lucide-react";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/admin/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setNotifications([
            { _id: "1", title: "New Patient Registration", message: "John Doe registered", type: "info", read: false, createdAt: "2024-01-15" },
            { _id: "2", title: "Doctor Approval Needed", message: "Dr. Smith awaiting approval", type: "warning", read: false, createdAt: "2024-01-14" },
            { _id: "3", title: "Payment Failed", message: "Payment failed for appointment", type: "error", read: true, createdAt: "2024-01-13" },
          ]);
        }
      });
  }, []);

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Manage system notifications and alerts.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}>
          <Check className="h-4 w-4 mr-2" /> Mark All Read
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold">All Notifications ({notifications.length})</h3>
        </div>
        <div className="p-4 space-y-3">
          {notifications.map((notif) => (
            <div key={notif._id} className={`flex items-start gap-3 p-3 rounded-lg border ${!notif.read ? "bg-blue-50" : ""}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                notif.type === "error" ? "bg-red-100" : notif.type === "warning" ? "bg-yellow-100" : "bg-blue-100"
              }`}>
                <AlertTriangle className={`h-4 w-4 ${notif.type === "error" ? "text-red-600" : notif.type === "warning" ? "text-yellow-600" : "text-blue-600"}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{notif.title}</p>
                <p className="text-sm text-muted-foreground">{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notif.createdAt}</p>
              </div>
              {!notif.read && <Badge variant="primary">New</Badge>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
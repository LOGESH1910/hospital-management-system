"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { Calendar, Clock, User, CheckCircle, XCircle, AlertTriangle, Activity, ArrowUpRight, Filter } from "lucide-react";

interface Appointment {
  _id: string;
  patient: { _id: string; name: string; email: string };
  doctor: { _id: string; name: string; specialization: string };
  date: string;
  time: string;
  reason: string;
  status: string;
  consultationFee: number;
  paymentStatus: string;
  createdAt: string;
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = filter !== "ALL" ? `/api/admin/appointments?status=${filter}` : "/api/admin/appointments";
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success" || data.status === "ok") {
        const appointmentData = data.data?.appointments || data.data?.recentAppointments || [];
        setAppointments(appointmentData);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "primary";
      case "PENDING": return "warning";
      case "COMPLETED": return "success";
      case "CANCELLED": return "error";
      default: return "default";
    }
  };

  const getPaymentVariant = (status: string) => {
    switch (status) {
      case "SUCCESS": return "success";
      case "PENDING": return "warning";
      case "FAILED": return "error";
      default: return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointment Management</h1>
        <p className="text-muted-foreground">View and manage all appointments across the platform.</p>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">All Appointments ({appointments.length})</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setFilter("ALL")}>
                <Filter className="h-3 w-3 mr-1" /> All
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFilter("PENDING")}>
                <AlertTriangle className="h-3 w-3 mr-1" /> Pending
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFilter("CONFIRMED")}>
                <Activity className="h-3 w-3 mr-1" /> Confirmed
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFilter("COMPLETED")}>
                <CheckCircle className="h-3 w-3 mr-1" /> Completed
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFilter("CANCELLED")}>
                <XCircle className="h-3 w-3 mr-1" /> Cancelled
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {appointments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No appointments found</p>
          ) : (
            appointments.map((apt) => (
              <div key={apt._id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{apt.patient?.name || "Patient"}</p>
                    <p className="text-sm text-muted-foreground">{apt.doctor?.name || "Doctor"}</p>
                    <p className="text-xs text-muted-foreground">{apt.date} at {apt.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(apt.status)}>{apt.status}</Badge>
                  <Badge variant={getPaymentVariant(apt.paymentStatus)}>{apt.paymentStatus}</Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
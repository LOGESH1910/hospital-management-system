"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { FileText, Clock } from "lucide-react";

interface Prescription {
  _id: string;
  patient: { _id: string; name: string; email: string };
  doctor: { _id: string; name: string; specialization: string };
  prescription: string;
  date: string;
  status: string;
}

export default function AdminPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/prescriptions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success" || data.status === "ok") {
        setPrescriptions(data.data?.prescriptions || []);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
        <p className="text-muted-foreground">Manage and view all prescriptions across the platform.</p>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold">All Prescriptions ({prescriptions.length})</h3>
        </div>
        <div className="p-4 space-y-3">
          {prescriptions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No prescriptions found</p>
          ) : (
            prescriptions.map((prescription) => (
              <div key={prescription._id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{prescription.patient?.name || "Patient"}</p>
                    <p className="text-sm text-muted-foreground">{prescription.doctor?.name || "Doctor"}</p>
                    <p className="text-xs text-muted-foreground">{prescription.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{prescription.status}</Badge>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
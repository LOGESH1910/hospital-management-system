"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface MedicalRecord {
  _id: string;
  patient: { _id: string; name: string; email: string };
  doctor: { _id: string; name: string; specialization: string };
  diagnosis: string;
  prescription: string;
  consultationFee: number;
  status: string;
  paymentStatus: string;
  date: string;
}

export default function AdminMedicalRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/medical-records", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success" || data.status === "ok") {
        setRecords(data.data?.records || []);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
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
        <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
        <p className="text-muted-foreground">View patient medical records, diagnoses, and prescriptions.</p>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold">All Records ({records.length})</h3>
        </div>
        <div className="p-4 space-y-3">
          {records.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No medical records found</p>
          ) : (
            records.map((record) => (
              <div key={record._id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{record.patient?.name || "Patient"}</p>
                    <p className="text-sm text-muted-foreground">{record.doctor?.name || "Doctor"} • {record.diagnosis}</p>
                    <p className="text-xs text-muted-foreground">{record.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={record.status === "COMPLETED" ? "success" : "warning"}>{record.status}</Badge>
                  <Badge variant={record.paymentStatus === "SUCCESS" ? "success" : "warning"}>{record.paymentStatus}</Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
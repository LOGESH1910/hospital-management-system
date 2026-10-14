"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { Users, Plus, CheckCircle, XCircle, AlertTriangle, ArrowUpRight, Search, Filter } from "lucide-react";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  department: string;
  qualification: string;
  experience: number;
  approvalStatus: string;
  isActive: boolean;
  consultationFee: number;
  createdAt: string;
}

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchDoctors();
  }, [filter]);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = filter !== "ALL" ? `/api/admin/doctors?status=${filter}` : "/api/admin/doctors";
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success" || data.status === "ok") {
        setDoctors(data.data?.doctors || []);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/doctors/${id}/approve`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/doctors/${id}/reject`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/doctors/${id}/deactivate`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error deactivating doctor:", error);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "APPROVED": return "success";
      case "PENDING": return "warning";
      case "REJECTED": return "error";
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Management</h1>
          <p className="text-muted-foreground">Manage doctor accounts, approvals, and deactivations.</p>
        </div>
        <Link href="/admin/doctors/new">
          <Button variant="primary" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Doctor
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">All Doctors ({doctors.length})</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setFilter("ALL")}>
                <Filter className="h-3 w-3 mr-1" /> All
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFilter("PENDING")}>
                <AlertTriangle className="h-3 w-3 mr-1" /> Pending
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFilter("APPROVED")}>
                <CheckCircle className="h-3 w-3 mr-1" /> Approved
              </Button>
              <Button variant="outline" size="sm" onClick={() => setFilter("REJECTED")}>
                <XCircle className="h-3 w-3 mr-1" /> Rejected
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {doctors.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No doctors found</p>
          ) : (
            doctors.map((doctor) => (
              <div key={doctor._id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{doctor.specialization} • {doctor.department}</p>
                    <p className="text-xs text-muted-foreground">{doctor.email} • Fee: ${doctor.consultationFee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(doctor.approvalStatus)}>{doctor.approvalStatus}</Badge>
                  {doctor.isActive ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="error">Inactive</Badge>
                  )}
                  {doctor.approvalStatus === "PENDING" && (
                    <>
                      <Button variant="primary" size="sm" onClick={() => handleApprove(doctor._id)}>
                        <CheckCircle className="h-3 w-3 mr-1" /> Approve
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleReject(doctor._id)}>
                        <XCircle className="h-3 w-3 mr-1" /> Reject
                      </Button>
                    </>
                  )}
                  {doctor.approvalStatus === "APPROVED" && doctor.isActive && (
                    <Button variant="outline" size="sm" onClick={() => handleDeactivate(doctor._id)}>
                      Deactivate
                    </Button>
                  )}
                  <Link href={`/admin/doctors/${doctor._id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
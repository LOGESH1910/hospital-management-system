"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { Stethoscope, Plus, ChevronRight, Activity } from "lucide-react";

interface Department {
  name: string;
  doctorCount: number;
}

export default function AdminDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/departments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success" || data.status === "ok") {
        setDepartments(data.data?.departments || []);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Department Management</h1>
          <p className="text-muted-foreground">Manage hospital departments and their configurations.</p>
        </div>
        <Link href="/admin/departments/new">
          <Button variant="primary" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Department
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8 col-span-full">No departments found</p>
        ) : (
          departments.map((dept, index) => (
            <Card key={index} className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <div className="border-b border-border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{dept.name}</h3>
                  <Badge variant="primary">{dept.doctorCount} Doctors</Badge>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Stethoscope className="h-4 w-4" />
                  <span>{dept.doctorCount} active doctors</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
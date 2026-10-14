"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { BarChart3, Users, Calendar, DollarSign, Activity, ArrowUpRight } from "lucide-react";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalPatients: 1250,
    totalDoctors: 85,
    totalAppointments: 3400,
    revenue: 42500,
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Platform performance metrics and insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Patients</span>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">{stats.totalPatients.toLocaleString()}</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><ArrowUpRight className="h-3 w-3" /> +12%</p>
          </div>
        </Card>
        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Doctors</span>
              <Activity className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">{stats.totalDoctors}</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><ArrowUpRight className="h-3 w-3" /> +5%</p>
          </div>
        </Card>
        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Appointments</span>
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">{stats.totalAppointments.toLocaleString()}</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><ArrowUpRight className="h-3 w-3" /> +8%</p>
          </div>
        </Card>
        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Revenue</span>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><ArrowUpRight className="h-3 w-3" /> +18%</p>
          </div>
        </Card>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Appointment Trends</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="p-8">
          <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
            <p className="text-muted-foreground">Chart visualization would appear here</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
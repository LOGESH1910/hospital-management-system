"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { Users, Calendar, Stethoscope, DollarSign, CheckCircle, Clock, XCircle, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    revenue: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success" || data.status === "ok") {
        setStats(data.data?.stats || data.data || stats);
        setRecentAppointments(data.data?.recentAppointments || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Patients", value: stats.totalPatients, icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: "+12%", trend: "up" as const },
    { title: "Total Doctors", value: stats.totalDoctors, icon: Stethoscope, color: "text-green-600", bg: "bg-green-50", change: "+5%", trend: "up" as const },
    { title: "Appointments Today", value: stats.totalAppointments, icon: Calendar, color: "text-purple-600", bg: "bg-purple-50", change: "+8%", trend: "up" as const },
    { title: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", change: "+18%", trend: "up" as const },
  ];

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
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's your hospital overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <div className="border-b border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{stat.title}</span>
                <div className={`${stat.bg} p-2 rounded-lg`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm">
          <div className="border-b border-border p-4">
            <h3 className="font-semibold">Appointment Overview</h3>
            <p className="text-sm text-muted-foreground">Real-time appointment status breakdown</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Completed</span>
              </div>
              <Badge variant="success">{stats.completedAppointments}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Confirmed</span>
              </div>
              <Badge variant="primary">{stats.confirmedAppointments}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <Badge variant="warning">{stats.pendingAppointments}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Cancelled</span>
              </div>
              <Badge variant="error">{stats.cancelledAppointments}</Badge>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <h3 className="font-semibold">System Health</h3>
            <p className="text-sm text-muted-foreground">Platform status and security</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Server Status</span>
              <Badge variant="success">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database</span>
              <Badge variant="success">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Security</span>
              <Badge variant="success">Secured</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="text-sm font-medium">99.9%</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold">Recent Appointments</h3>
          <p className="text-sm text-muted-foreground">Latest appointment activity across the platform</p>
        </div>
        <div className="p-4 space-y-4">
          {recentAppointments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No recent appointments</p>
          ) : (
            recentAppointments.map((apt, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{apt.patient?.name || "Patient"}</p>
                    <p className="text-xs text-muted-foreground">{apt.doctor?.name || "Doctor"} • {apt.date}</p>
                  </div>
                </div>
                <Badge variant={apt.status === "CONFIRMED" ? "primary" : apt.status === "PENDING" ? "warning" : "error"}>
                  {apt.status}
                </Badge>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
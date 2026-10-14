"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { StatCard } from "@/components/ui/stats/stat-card";
import { EmptyState } from "@/components/ui/empty-states/empty-state";
import { Loader } from "@/components/ui/loaders/loader";
import { cn } from "@/lib/utils";

interface Appointment {
  _id: string;
  date: string;
  time: string;
  reason: string;
  status: string;
  consultationFee: number;
  patient: {
    _id: string;
    name: string;
    email: string;
  };
}

interface User {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  profileImage: string;
  consultationFee: number;
}

const getStatusClass = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-success-100 text-success-700";
    case "PENDING":
      return "bg-warning-100 text-warning-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const cancelAppointment = async (appointmentId: string) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  
  try {
    await fetch(`/api/doctor/appointments/${appointmentId}/cancel`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  } catch (error) {
    console.error("Error cancelling appointment:", error);
  }
};

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "patients">("today");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const [userRes, appointmentsRes] = await Promise.all([
        fetch("/api/doctor/profile", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/doctor/appointments", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.data.user);
      }

      if (appointmentsRes.ok) {
        const appointmentsData = await appointmentsRes.json();
        const appointments = appointmentsData.data.appointments || [];
        
        const today = new Date().toISOString().split("T")[0];
        
        const todayApts = appointments.filter((a: Appointment) => a.date === today);
        const upcoming = appointments.filter((a: Appointment) => 
          a.date > today && (a.status === "PENDING" || a.status === "CONFIRMED")
        );
        
        setTodayAppointments(todayApts);
        setUpcomingAppointments(upcoming);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const stats = [
    { value: todayAppointments.length, label: "Today's Appointments", icon: (
      <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { value: 0, label: "Total Patients", icon: (
      <svg className="h-8 w-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
    { value: 0, label: "Pending", icon: (
      <svg className="h-8 w-8 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { value: 0, label: "Completed", icon: (
      <svg className="h-8 w-8 text-info-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: "#3b82f6", stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: "#1d4ed8", stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="24" y1="12" x2="24" y2="36" />
                    <line x1="12" y1="24" x2="36" y2="24" />
                    <path d="M24 2a22 22 0 1 1 0 44A22 22 0 0 1 24 2Z" opacity="0.3" />
                  </g>
                  <circle cx="24" cy="24" r="5" fill="url(#logoGrad)" />
                </svg>
                <span className="text-xl font-bold text-gray-900">MediCare Pro</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <button onClick={() => setActiveTab("today")} className={`text-sm font-medium transition-colors ${activeTab === "today" ? "text-primary-600" : "text-gray-600 hover:text-primary-600"}`}>
                  Today
                </button>
                <button onClick={() => setActiveTab("upcoming")} className={`text-sm font-medium transition-colors ${activeTab === "upcoming" ? "text-primary-600" : "text-gray-600 hover:text-primary-600"}`}>
                  Upcoming
                </button>
                <button onClick={() => setActiveTab("patients")} className={`text-sm font-medium transition-colors ${activeTab === "patients" ? "text-primary-600" : "text-gray-600 hover:text-primary-600"}`}>
                  Patients
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/doctor/profile">
                <Button variant="ghost" size="sm">Profile</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Good morning, Dr. {user?.name?.split(" ").slice(-1)[0] || "Doctor"}!
          </h1>
          <p className="text-gray-600 mt-1">{user?.specialization || "Specialist"}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>

        <Card>
          {activeTab === "today" && (
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Schedule</h2>
              
              {todayAppointments.length === 0 ? (
                <EmptyState
                  title="No appointments today"
                  description="You have a free day! Enjoy your time off."
                />
              ) : (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment._id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                            <svg className="h-8 w-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.patient?.name || "Patient"}</h3>
                            <p className="text-sm text-gray-500">{appointment.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${appointment.status === "CONFIRMED" ? "bg-success-100 text-success-700" : 
                             appointment.status === "PENDING" ? "bg-warning-100 text-warning-700" : "bg-gray-100 text-gray-700"
                            }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/doctor/appointments/${appointment._id}`}>View Patient</Link>
                        </Button>
                        {appointment.status === "PENDING" && (
                          <>
                            <Button variant="primary" size="sm" onClick={() => acceptAppointment(appointment._id)}>
                              Accept
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => rejectAppointment(appointment._id)}>
                              Reject
                            </Button>
                          </>
                        )}
                        {appointment.status === "CONFIRMED" && (
                          <Button variant="primary" size="sm" onClick={() => completeAppointment(appointment._id)}>
                            Complete
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => rescheduleAppointment(appointment._id, router)}>
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === "upcoming" && (
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Appointments</h2>
              
              {upcomingAppointments.length === 0 ? (
                <EmptyState
                  title="No upcoming appointments"
                  description="Your upcoming appointments will appear here."
                />
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment._id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                            <svg className="h-8 w-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.patient?.name || "Patient"}</h3>
                            <p className="text-sm text-gray-500">{appointment.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(appointment.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                          </p>
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${appointment.status === "CONFIRMED" ? "bg-success-100 text-success-700" : 
                             appointment.status === "PENDING" ? "bg-warning-100 text-warning-700" : "bg-gray-100 text-gray-700"
                            }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/doctor/appointments/${appointment._id}`}>View Patient</Link>
                        </Button>
                        {appointment.status === "PENDING" && (
                          <>
                            <Button variant="primary" size="sm" onClick={() => acceptAppointment(appointment._id)}>
                              Accept
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => rejectAppointment(appointment._id)}>
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm" onClick={() => rescheduleAppointment(appointment._id, router)}>
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === "patients" && (
            <div className="p-4">
              <EmptyState
                title="Patient Management"
                description="View and manage your patients here."
                buttonText="View All Patients"
                buttonHref="/doctor/patients"
              />
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}

interface Appointment {
  _id: string;
  date: string;
  time: string;
  reason: string;
  status: string;
  consultationFee: number;
  patient: {
    _id: string;
    name: string;
    email: string;
  };
}

interface User {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  profileImage: string;
  consultationFee: number;
}

const stats = [
  { value: 0, label: "Today's Appointments", icon: (
    <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )},
  { value: 0, label: "Total Patients", icon: (
    <svg className="h-8 w-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )},
  { value: 0, label: "Pending", icon: (
    <svg className="h-8 w-8 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  { value: 0, label: "Completed", icon: (
    <svg className="h-8 w-8 text-info-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
];

const acceptAppointment = async (appointmentId: string) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  
  try {
    await fetch(`/api/doctor/appointments/${appointmentId}/accept`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  } catch (error) {
    console.error("Error accepting appointment:", error);
  }
};

const rejectAppointment = async (appointmentId: string) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  
  try {
    await fetch(`/api/doctor/appointments/${appointmentId}/reject`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  } catch (error) {
    console.error("Error rejecting appointment:", error);
  }
};

const completeAppointment = async (appointmentId: string) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  
  try {
    await fetch(`/api/doctor/appointments/${appointmentId}/complete`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  } catch (error) {
    console.error("Error completing appointment:", error);
  }
};

const rescheduleAppointment = async (appointmentId: string, router: any) => {
  // Navigate to reschedule page
  router.push(`/doctor/appointments/${appointmentId}/reschedule`);
};
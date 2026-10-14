"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { Search, MapPin, Star, Stethoscope, Clock } from "lucide-react";
import Link from "next/link";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  department: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  isActive: boolean;
}

export default function SearchPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const searchDoctors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (specialization) params.set("specialization", specialization);
      if (department) params.set("department", department);
      
      const res = await fetch(`/api/doctor/search?${params.toString()}`);
      const data = await res.json();
      if (data.status === "success") {
        setDoctors(data.data?.doctors || []);
      }
    } catch (error) {
      console.error("Error searching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchDoctors();
  }, []);

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find a Doctor</h1>
        <p className="text-muted-foreground">Search for doctors by name, specialty, or department.</p>
      </div>

      <Card className="shadow-sm">
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, specialty, or department..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button variant="primary" size="sm" onClick={searchDoctors} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8 col-span-full">No doctors found</p>
        ) : (
          doctors.map((doctor) => (
            <Card key={doctor._id} className="shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <div className="border-b border-border p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {doctor.department}
                  </p>
                  <p className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> {doctor.experience} years experience
                  </p>
                  <p className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> ${doctor.consultationFee}/session
                  </p>
                </div>
              </div>
              <div className="p-4">
                <Link href={`/doctors/${doctor._id}`}>
                  <Button variant="primary" size="sm" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
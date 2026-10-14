import React from "react";
import { Button } from "@/components/ui/buttons/button";

const doctors = [
  {
    name: "Dr. Sarah Chen",
    specialization: "Cardiology",
    qualification: "MD, FACC",
    experience: 15,
    rating: 4.9,
    fee: 250,
    image: null,
    available: true
  },
  {
    name: "Dr. Michael Rodriguez",
    specialization: "Neurology",
    qualification: "MD, PhD",
    experience: 12,
    rating: 4.8,
    fee: 300,
    image: null,
    available: true
  },
  {
    name: "Dr. Emily Johnson",
    specialization: "Pediatrics",
    qualification: "MD, FAAP",
    experience: 10,
    rating: 4.9,
    fee: 180,
    image: null,
    available: true
  },
  {
    name: "Dr. James Wilson",
    specialization: "Orthopedics",
    qualification: "MD, FRCS",
    experience: 18,
    rating: 4.7,
    fee: 220,
    image: null,
    available: false
  }
];

export const DoctorsPreview = () => {
  return (
    <section id="doctors" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Featured Specialists
            </h2>
            <p className="text-lg text-gray-600">
              Meet our top-rated doctors across all specialties
            </p>
          </div>
          <Button variant="outline" size="lg" asChild>
            <a href="/doctors">View All Doctors</a>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <svg className="h-24 w-24 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-primary-600 text-sm font-medium mb-1">{doctor.specialization}</p>
                <p className="text-gray-500 text-sm mb-3">{doctor.qualification} • {doctor.experience}+ years exp</p>
                
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="font-medium">{doctor.rating}</span>
                  </div>
                  <span className="text-gray-500">${doctor.fee}/consultation</span>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" asChild>
                    <a href="/doctors/1">View Profile</a>
                  </Button>
                  <Button size="sm" variant={doctor.available ? "primary" : "ghost"} disabled={!doctor.available} className="flex-1" asChild>
                    <a href="/booking/1">{doctor.available ? "Book Now" : "Unavailable"}</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
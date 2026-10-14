import React from "react";
import { Button } from "@/components/ui/buttons/button";

const departments = [
  { name: "Cardiology", icon: "❤️", color: "text-red-600", bg: "bg-red-100", desc: "Heart & vascular care", doctors: 12 },
  { name: "Neurology", icon: "🧠", color: "text-purple-600", bg: "bg-purple-100", desc: "Brain & nervous system", doctors: 8 },
  { name: "Orthopedics", icon: "🦴", color: "text-orange-600", bg: "bg-orange-100", desc: "Bones, joints & muscles", doctors: 10 },
  { name: "Pediatrics", icon: "👶", color: "text-pink-600", bg: "bg-pink-100", desc: "Children's healthcare", doctors: 15 },
  { name: "Dermatology", icon: "🩹", color: "text-teal-600", bg: "bg-teal-100", desc: "Skin, hair & nails", doctors: 6 },
  { name: "General Medicine", icon: "🩺", color: "text-blue-600", bg: "bg-blue-100", desc: "Primary care & wellness", doctors: 20 },
  { name: "ENT", icon: "👂", color: "text-indigo-600", bg: "bg-indigo-100", desc: "Ear, nose & throat", doctors: 5 },
  { name: "Radiology", icon: "📷", color: "text-gray-600", bg: "bg-gray-100", desc: "Medical imaging", doctors: 8 },
  { name: "Emergency", icon: "🚑", color: "text-red-700", bg: "bg-red-50", desc: "24/7 emergency care", doctors: 12 }
];

export const Departments = () => {
  return (
    <section id="departments" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Specialized Departments
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            World-class specialists across all major medical disciplines
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="group p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`h-16 w-16 rounded-xl flex items-center justify-center text-3xl ${dept.bg}`}>
                  {dept.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{dept.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{dept.desc}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>{dept.doctors} specialists</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="/departments">View All Departments</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
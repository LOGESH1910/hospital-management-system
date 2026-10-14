import React from "react";
import { Button } from "@/components/ui/buttons/button";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-primary-700">
                Smarter Healthcare. Better Patient Care.
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              A modern hospital management platform connecting patients, doctors, and healthcare administrators in one secure digital ecosystem.
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Streamline appointments, manage medical records, and deliver exceptional patient care with our comprehensive healthcare management system.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild>
                <a href="/signup" className="w-full">Book an Appointment</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/login" className="w-full">Get Started</a>
              </Button>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Secure & HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-100 to-primary-200">
              <img
                src="/assets/hero-image.svg"
                alt="Modern premium hospital with glass architecture, doctors and patients in reception"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-success-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">99.9% Uptime</p>
                  <p className="text-sm text-gray-500">Platform reliability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
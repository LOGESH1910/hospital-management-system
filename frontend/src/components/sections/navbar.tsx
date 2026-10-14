import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2" aria-label="MediCare Pro Home">
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
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="#services" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Services
              </Link>
              <Link href="#doctors" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Doctors
              </Link>
              <Link href="#departments" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Departments
              </Link>
              <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                About
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="MediCare Pro Home">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#3b82f6", stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: "#1d4ed8", stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <g stroke="url(#logoGradFooter)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="24" y1="12" x2="24" y2="36" />
                  <line x1="12" y1="24" x2="36" y2="24" />
                  <path d="M24 2a22 22 0 1 1 0 44A22 22 0 0 1 24 2Z" opacity="0.3" />
                </g>
                <circle cx="24" cy="24" r="5" fill="url(#logoGradFooter)" />
              </svg>
              <span className="text-xl font-bold text-white">MediCare Pro</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Smarter Healthcare. Better Patient Care.
              A modern hospital management platform connecting patients, doctors, and healthcare administrators.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#api" className="hover:text-white transition-colors">API Docs</Link></li>
              <li><Link href="#changelog" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#press" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#community" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link href="#webinars" className="hover:text-white transition-colors">Webinars</Link></li>
              <li><Link href="#security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#compliance" className="hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 MediCare Pro. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#cookies" className="text-gray-500 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
// components/Footer.tsx
"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">FinSphere</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Smart. Secure. Simplified Banking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/dashboard/profile">Profile</Link></li>
            <li><Link href="/dashboard/transfer">Transfer</Link></li>
            <li><Link href="/dashboard/help">Help & Support</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Security</Link></li>
            <li><Link href="#">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5" /> support@finsphere.com</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5" /> +91 98765 43210</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /> Bengaluru, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t pt-4 pb-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} <strong>FinSphere</strong>. All rights reserved.
      </div>
    </footer>
  );
}

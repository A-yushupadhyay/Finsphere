"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(pathname.startsWith("/dashboard"));
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        {showSidebar && <Sidebar />}

        <div className="flex flex-col flex-1 min-h-[calc(100vh-64px)]">
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

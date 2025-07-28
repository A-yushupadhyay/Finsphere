"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Send, User, Users, Menu, ArrowLeft, BarChart, CreditCard,
  Settings, HelpCircle, Bell, LogOut, UploadCloud
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  const isAdmin = session?.user?.role === "admin";

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/transfer", label: "Transfer", icon: Send },
    { href: "/dashboard/transfer-user", label: "Transfer to User", icon: Users },
    // ✅ Admin-only links
    ...(isAdmin ? [
      { href: "/dashboard/admin", label: "Admin", icon: User },
      { href: "/dashboard/admin/loans", label: "Loan", icon: CreditCard },
    ] : []),
    // { href: "/dashboard/beneficiaries", label: "Beneficiaries", icon: Users },
    { href: "/dashboard/kyc-upload", label: "KYC Upload", icon: UploadCloud }, // ✅ ADDED HERE
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },

    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/support", label: "Support", icon: HelpCircle },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  ];

  const handleLogout = () => {
    toast.success("Logout successful");
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 800);
  };

  const SidebarContent = (
    <>
      {/* Collapse Toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-blue-600 dark:text-blue-400 focus:outline-none"
        >
          {collapsed ? <Menu size={20} /> : <ArrowLeft size={20} />}
        </button>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <Link
                href={href}
                onClick={onCloseMobile}
                className={cn(
                  "group flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  "hover:bg-slate-100 dark:hover:bg-zinc-800",
                  isActive
                    ? "bg-slate-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                <span className={cn("w-6 flex justify-center items-center", collapsed && "mx-auto")}>
                  <Icon
                    size={20}
                    className={isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}
                  />
                </span>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}

        {/* ✅ Logout Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <span className="w-6 flex justify-center items-center">
              <LogOut size={20} />
            </span>
            {!collapsed && <span>Logout</span>}
          </button>
        </motion.div>
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex min-h-screen flex-col bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 shadow-sm px-4 py-6 transition-all duration-300",
          collapsed ? "w-[60px]" : "w-60"
        )}
      >
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-60 bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 p-6">
            {SidebarContent}
          </div>
          <div
            className="flex-1 bg-black/30 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
        </div>
      )}
    </>
  );
}

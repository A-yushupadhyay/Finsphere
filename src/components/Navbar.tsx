"use client";

import { useState, useEffect} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {  Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/transfer", label: "Transfer" },
  { href: "/dashboard/transfer-user", label: "Transfer to User" },
  // { href: "/dashboard/admin", label: "Admin" },
  { href: "/dashboard/loan", label: "Loan" },
  // { href: "/dashboard/beneficiaries", label: "Beneficiaries" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // const toggleTheme = () => setIsDark((prev) => !prev);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Left: Logo & Menu */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          FinSphere
        </Link>
      </div>

      {/* Center: Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-600",
              pathname === href && "text-blue-600 dark:text-blue-400"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Right: Theme + Avatar */}
      <div className="flex items-center gap-3 relative">
        {/* <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button> */}

        {user && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="rounded-full overflow-hidden border w-9 h-9"
            >
              <Image
                src={user.image || "/avatar.png"}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full"
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl shadow-lg py-2 z-50"
                >
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-600 text-left text-red-600 dark:text-red-300"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 md:hidden bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 shadow-md px-4 py-4 space-y-4 z-50"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block text-sm font-medium hover:text-blue-600 transition",
                  pathname === href && "text-blue-600 dark:text-blue-400"
                )}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
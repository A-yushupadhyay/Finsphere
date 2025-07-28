// components/ThemeProvider.tsx
"use client";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div>
      {children}
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow bg-white dark:bg-slate-800 text-gray-800 dark:text-white"
        title="Toggle theme"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

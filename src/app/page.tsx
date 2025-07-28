// src/app/page.tsx
import Link from "next/link";
import React from "react";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";



export default async function HomePage() {
   const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-white dark:bg-neutral-950 text-center text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">💳 Welcome to SmartBank</h1>
      <p className="text-lg sm:text-xl max-w-xl mb-8">
        A modern, secure, and scalable digital banking experience. Built with Next.js, TypeScript, and ❤️
      </p>

      <div className="flex gap-4">
        <Link
          href="/api/auth/signin"
          className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-semibold transition hover:scale-105"
        >
          Get Started
        </Link>
        <Link
          href="https://github.com/ayush-dev/smartbank" // optional or route to about page
          className="border border-gray-500 dark:border-gray-300 px-6 py-3 rounded-lg font-medium hover:scale-105 transition"
        >
          Learn More
        </Link>
      </div>
    </main>
  );
}

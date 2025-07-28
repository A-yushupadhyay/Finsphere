"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const {  status } = useSession();
  const router = useRouter();

  // ✅ Redirect to /dashboard if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="max-w-md w-full bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          🔐 Sign in to SmartBank
        </h1>
        <button
          onClick={() => signIn("google")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

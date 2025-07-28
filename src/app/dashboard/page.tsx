"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import TransactionFeed from "@/components/TransactionFeed";
import { motion } from "framer-motion";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

interface Account {
  id: string;
  type: string;
  balance: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [account, setAccount] = useState<Account | null>(null);
  const user = session?.user;

  useEffect(() => {
    if (user) {
      fetch("/api/account")
        .then((res) => res.json())
        .then((data) => setAccount(data))
        .catch(console.error);
    }
  }, [user]);

  const isLoading = status === "loading" || !account;

  return (
    <main className="p-6 relative">
      <LoadingOverlay show={isLoading} />


      {/* ✅ Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"} 👋</h1>
          <p className="text-muted-foreground text-sm">Manage your finances smartly and securely.</p>
        </div>
        <Avatar user={user} size={48} showStatus />
      </div>

      {/* ✅ Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Account Type</p>
          <h2 className="text-xl font-semibold uppercase">{account?.type}</h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">Current Balance</p>
          <h2 className="text-xl font-semibold text-green-600">
            ₹ {account?.balance.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </h2>
        </Card>

        <Card>
          <p className="text-sm text-gray-500">Account ID</p>
          <h2 className="text-sm font-mono break-all text-blue-600">{account?.id}</h2>
        </Card>
      </div>

      {/* ✅ Quick Actions */}
      <motion.div
        className="flex flex-wrap gap-4 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Button variant="primary" className="w-full sm:w-auto">
          💸 Send Money
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          ➕ Add Funds
        </Button>
      </motion.div>

      {/* ✅ Transactions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">Recent Transactions</h2>
        <TransactionFeed />
      </div>
    </main>
  );
}

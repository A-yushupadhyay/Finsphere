"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  timestamp: string;
}

export default function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/account/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, []);

  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-sm mt-4 text-center"
      >
        No transactions yet.
      </motion.div>
    );
  }

  const incoming = transactions.filter((txn) => txn.type === "credit");
  const outgoing = transactions.filter((txn) => txn.type === "debit");

  const TransactionSection = ({
    title,
    data,
    color,
    sign,
  }: {
    title: string;
    data: Transaction[];
    color: "green" | "red";
    sign: "+" | "-";
  }) => (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h2>
      <ul className="space-y-2">
        {data.map((txn) => (
          <motion.li
            key={txn.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "rounded-xl p-4 flex justify-between items-start shadow-sm border",
              "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"
            )}
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {txn.description || "No description"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(txn.timestamp).toLocaleString()}
              </p>
            </div>
            <span
              className={cn(
                "text-md font-semibold",
                color === "green" ? "text-green-600" : "text-red-500"
              )}
            >
              {sign} ₹{txn.amount.toFixed(2)}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-6 space-y-8"
    >
      <TransactionSection
        title="🟢 Incoming (Credits)"
        data={incoming}
        color="green"
        sign="+"
      />
      <TransactionSection
        title="🔴 Outgoing (Debits)"
        data={outgoing}
        color="red"
        sign="-"
      />
    </motion.div>
  );
}

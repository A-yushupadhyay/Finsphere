"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sampleData = [
  { month: "Jan", credit: 5000, debit: 2000 },
  { month: "Feb", credit: 3000, debit: 1500 },
  { month: "Mar", credit: 7000, debit: 3000 },
];

export default function TransactionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 md:p-8"
      )}
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        📈 Monthly Financial Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "0.5rem",
              color: "#f9fafb",
            }}
            labelStyle={{ color: "#d1d5db" }}
          />
          <Line
            type="monotone"
            dataKey="credit"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="debit"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

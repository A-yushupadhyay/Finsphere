"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Transaction = {
  id: string;
  amount: number;
  type: "credit" | "debit";
  timestamp: string;
};

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/account/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, []);

  if (transactions.length === 0) {
    return <p className="text-gray-500 text-sm mt-4">No data available.</p>;
  }

  // 🧠 Data prep
  const credit = transactions.filter(t => t.type === "credit").reduce((acc, t) => acc + t.amount, 0);
  const debit = transactions.filter(t => t.type === "debit").reduce((acc, t) => acc + t.amount, 0);

  const pieData = [
    { name: "Credit", value: credit },
    { name: "Debit", value: debit },
  ];
  const COLORS = ["#22c55e", "#ef4444"];

  // Group by month
  const monthlyData: { [key: string]: { credit: number, debit: number } } = {};
  transactions.forEach(t => {
    const month = new Date(t.timestamp).toLocaleString("default", { month: "short" });
    if (!monthlyData[month]) monthlyData[month] = { credit: 0, debit: 0 };
    monthlyData[month][t.type] += t.amount;
  });

  const lineChartData = Object.entries(monthlyData).map(([month, values]) => ({
    month,
    ...values,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">📊 Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow">
          <p className="text-sm text-muted-foreground">Total Credit</p>
          <h2 className="text-2xl font-bold text-green-500">₹{credit.toFixed(2)}</h2>
        </div>
        <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow">
          <p className="text-sm text-muted-foreground">Total Debit</p>
          <h2 className="text-2xl font-bold text-red-500">₹{debit.toFixed(2)}</h2>
        </div>
        <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow">
          <p className="text-sm text-muted-foreground">Net Savings</p>
          <h2 className="text-2xl font-bold">{credit - debit >= 0 ? "+" : "-"}₹{Math.abs(credit - debit).toFixed(2)}</h2>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Credit vs Debit</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Trend Line Chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Monthly Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="credit" stroke="#22c55e" />
            <Line type="monotone" dataKey="debit" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

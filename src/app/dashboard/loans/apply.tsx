"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ApplyLoanPage() {
  const [amount, setAmount] = useState(10000);
  const [tenure, setTenure] = useState(12); // months
  const [interestRate, setInterestRate] = useState(10); // %
  const router = useRouter();

  const handleApply = async () => {
    const res = await fetch("/api/loan/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, tenure, interestRate }),
    });

    if (res.ok) {
      toast.success("Loan application submitted!");
      router.push("/dashboard/loans");
    } else {
      toast.error("Failed to apply for loan.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6 bg-white dark:bg-zinc-900 rounded-xl shadow">
      <h1 className="text-2xl font-bold">Apply for a Loan</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Loan Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tenure (months)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-zinc-800"
          />
        </div>

        <button
          onClick={handleApply}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}

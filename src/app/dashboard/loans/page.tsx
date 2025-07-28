"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Loan = {
  id: string;
  amount: number;
  tenure: number;
  interestRate: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export default function LoanDashboard() {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    fetch("/api/loan/my")
      .then((res) => res.json())
      .then(setLoans);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Loans</h1>
        <Link
          href="/dashboard/loans/apply"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Apply for Loan
        </Link>
      </div>

      {loans.length === 0 ? (
        <p className="text-gray-500">No loan applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="p-4 rounded-xl border shadow-sm bg-white dark:bg-zinc-900 space-y-2"
            >
              <h2 className="text-xl font-semibold">₹{loan.amount}</h2>
              <p>Tenure: {loan.tenure} months</p>
              <p>Interest: {loan.interestRate}%</p>
              <p>Status: <span className="capitalize">{loan.status}</span></p>
              <p className="text-sm text-muted-foreground">
                Applied on: {new Date(loan.createdAt).toLocaleDateString()}
              </p>
              <Link
                href={`/dashboard/loans/${loan.id}/view`}
                className="text-sm text-blue-600 underline"
              >
                View EMI Schedule →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

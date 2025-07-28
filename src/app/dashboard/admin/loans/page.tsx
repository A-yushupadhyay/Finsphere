"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Loan = {
  id: string;
  amount: number;
  tenure: number;
  interestRate: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
};

export default function AdminLoanPanel() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchLoans = async () => {
    const res = await fetch("/api/admin/loans");
    const data = await res.json();
    setLoans(data);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const updateLoanStatus = async (id: string, status: "approved" | "rejected") => {
    setLoadingId(id);
    const res = await fetch("/api/admin/loan/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loanId: id, status }),
    });
    if (res.ok) {
      await fetchLoans(); // Refresh after update
    } else {
      alert("Failed to update status.");
    }
    setLoadingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">📋 Loan Requests</h1>

      {loans.length === 0 ? (
        <p className="text-gray-500">No loan requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="p-4 rounded-xl bg-white dark:bg-zinc-900 border shadow space-y-2"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">₹{loan.amount}</h2>
                <p>
                  <span className="font-medium">User:</span> {loan.user.name} (
                  {loan.user.email})
                </p>
                <p>
                  <span className="font-medium">Tenure:</span> {loan.tenure} months
                </p>
                <p>
                  <span className="font-medium">Interest:</span> {loan.interestRate}%
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={cn(
                      "capitalize font-medium",
                      loan.status === "pending" && "text-yellow-500",
                      loan.status === "approved" && "text-green-600",
                      loan.status === "rejected" && "text-red-600"
                    )}
                  >
                    {loan.status}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Applied: {new Date(loan.createdAt).toLocaleString()}
                </p>
              </div>

              {loan.status === "pending" && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => updateLoanStatus(loan.id, "approved")}
                    disabled={loadingId === loan.id}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => updateLoanStatus(loan.id, "rejected")}
                    disabled={loadingId === loan.id}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

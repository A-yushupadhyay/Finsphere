"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// ✅ Define loan type
type Loan = {
  id: string;
  amount: number;
  tenure: number;
  interestRate: number;
  status: string;
};

export default function LoanDetailPage() {
  const { loanId } = useParams();
  const [loan, setLoan] = useState<Loan | null>(null); // ✅ Fixed typing

  useEffect(() => {
    fetch(`/api/loan/${loanId}`)
      .then((res) => res.json())
      .then(setLoan);
  }, [loanId]);

  if (!loan) return <p>Loading...</p>;

  const P = loan.amount;
  const r = loan.interestRate / 12 / 100;
  const n = loan.tenure;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Loan Details</h1>
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow space-y-3">
        <p>Amount: ₹{loan.amount}</p>
        <p>Tenure: {loan.tenure} months</p>
        <p>Interest: {loan.interestRate}%</p>
        <p>Monthly EMI: ₹{emi.toFixed(2)}</p>
        <p>Total Payable: ₹{totalPayable.toFixed(2)}</p>
        <p>Status: <strong>{loan.status}</strong></p>
      </div>
    </div>
  );
}

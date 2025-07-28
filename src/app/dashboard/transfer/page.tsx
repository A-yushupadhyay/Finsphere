"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { motion } from "framer-motion";

export default function TransferPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    // ✅ Client-side validation
    if (!name || !accountNumber || !confirmAccountNumber || !ifsc || !amount) {
      toast.error("🚫 All fields are required.");
      return;
    }

    if (accountNumber !== confirmAccountNumber) {
      toast.error("🚫 Account numbers do not match.");
      return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      toast.error("🚫 Enter a valid IFSC code.");
      return;
    }

    if (amount <= 0) {
      toast.error("🚫 Enter a valid amount.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/transfer/bank", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        accountNumber,
        ifsc,
        amount,
        description,
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("✅ Transfer to bank successful!");
      router.push("/dashboard");
    } else {
      const err = await res.text();
      toast.error(`❌ Transfer failed: ${err}`);
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">🏦 Transfer to Bank</h1>

      <Card animated>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleTransfer();
          }}
          loading={loading}
        >
          <Input
            label="Beneficiary Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Ayush Upadhyay"
          />

          <Input
            label="Bank Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="e.g., 1234567890"
          />

          <Input
            label="Confirm Account Number"
            value={confirmAccountNumber}
            onChange={(e) => setConfirmAccountNumber(e.target.value)}
            placeholder="Re-enter account number"
          />

          <Input
            label="IFSC Code"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value.toUpperCase())}
            placeholder="e.g., SBIN0001234"
          />

          <Input
            type="number"
            label="Amount (₹)"
            value={amount.toString()}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            min={1}
          />

          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g., EMI payment, fees"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Transfer to Bank"}
          </Button>
        </Form>
      </Card>
    </motion.div>
  );
}

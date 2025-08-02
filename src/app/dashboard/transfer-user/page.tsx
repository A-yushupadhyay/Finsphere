"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import { motion } from "framer-motion";

type Beneficiary = {
  id: string;
  recipientEmail: string;
};

export default function TransferToUserPage() {
  const router = useRouter();
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  // ✅ Load saved beneficiaries
  useEffect(() => {
    fetch("/api/beneficiaries/list")
      .then((res) => res.json())
      .then(setBeneficiaries)
      .catch(() => toast.error("Failed to load beneficiaries"));
  }, []);

  const handleSubmit = async () => {
    if (!recipientEmail || !recipientEmail.includes("@")) {
      toast.error("❌ Enter a valid email address.");
      return;
    }

    if (!amount || amount <= 0) {
      toast.error("❌ Please enter a valid amount.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipientEmail, amount, description }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("✅ Transfer successful!");
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
      <h1 className="text-3xl font-bold mb-6">📤 Transfer to another user</h1>

      <Card animated>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          loading={loading}
        >
          {/* ✅ Dropdown to select saved beneficiary */}
          {beneficiaries.length > 0 && (
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 dark:text-white mb-1 block">
                Select Saved Beneficiary
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg border dark:bg-zinc-800 dark:text-white"
                onChange={(e) => setRecipientEmail(e.target.value)}
              >
                <option value="">-- Choose a saved recipient --</option>
                {beneficiaries.map((b) => (
                  <option key={b.id} value={b.recipientEmail}>
                    {b.recipientEmail}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Input
            label="Recipient Email"
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="recipient@example.com"
          />

          <Input
            label="Amount (₹)"
            type="number"
            value={amount.toString()}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            min={1}
          />

          <Input
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Reason for transfer"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </Form>
      </Card>
    </motion.div>
  );
}

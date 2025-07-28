"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SupportPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !message) return toast.error("All fields are required");

    setLoading(true);
    const res = await fetch("/api/support/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message }),
    });

    setLoading(false);
    if (res.ok) {
      toast.success("Support ticket submitted!");
      setTitle("");
      setMessage("");
    } else {
      toast.error("Failed to submit ticket");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">🛟 Help & Support</h1>
      <input
        type="text"
        placeholder="Issue Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <textarea
        placeholder="Describe your issue..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Submitting..." : "Submit Ticket"}
      </button>
    </div>
  );
}

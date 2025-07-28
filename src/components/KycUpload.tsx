"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KycUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/user/kyc", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      toast.success("✅ KYC uploaded successfully!");
      console.log("Uploaded to:", data.url);
      router.push("/dashboard"); 
    } catch (err) {
      toast.error("❌ Failed to upload. Try again." + (err instanceof Error ? `: ${err.message}` : ""));
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 max-w-md mx-auto"
    >
      <label
        htmlFor="kycFile"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Upload KYC Document
      </label>

      <div className="flex items-center gap-3">
        <input
          id="kycFile"
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 dark:file:bg-blue-900 dark:file:text-blue-200 dark:hover:file:bg-blue-800"
        />
      </div>

      <Button
        onClick={handleUpload}
        disabled={loading}
        variant="primary"
        className="w-full sm:w-auto"
      >
        {loading ? "Uploading..." : <><UploadCloud className="w-4 h-4 mr-2" /> Upload KYC</>}
      </Button>
    </motion.div>
  );
}

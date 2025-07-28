"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import Form from "@/components/ui/Form";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/user/update-profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("✅ Profile updated!");
      update(); // 🔄 Refresh session
    } else {
      toast.error("❌ Failed to update profile.");
    }
  };

  if (!user) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <motion.div
      className="max-w-xl mx-auto p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">👤 My Profile</h1>

      <Card animated>
        <div className="flex items-center gap-4 mb-6">
          <Avatar user={user} size={64} />
          <div>
            <p className="text-lg font-semibold">{user.email}</p>
            <p className="text-sm text-muted-foreground">Role: {user.role || "user"}</p>
          </div>
        </div>

        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} loading={loading}>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Input
            label="Profile Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste your image URL"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </Form>
      </Card>
    </motion.div>
  );
}

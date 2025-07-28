"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enable2FA, setEnable2FA] = useState(false);

  const updateEmail = async () => {
    const res = await fetch("/api/user/update-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      toast.success("Email updated");
    } else {
      toast.error("Failed to update");
    }
  };

  const updatePassword = async () => {
    const res = await fetch("/api/user/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      toast.success("Password updated");
    } else {
      toast.error("Failed to update");
    }
  };

  const deleteAccount = async () => {
    const confirmed = confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    const res = await fetch("/api/user/delete", { method: "DELETE" });
    if (res.ok) {
      toast.success("Account deleted");
      window.location.href = "/";
    } else {
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Account Settings</h1>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Update Email</h2>
        <input
          className="w-full border p-2 rounded"
          placeholder="New email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={updateEmail} className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Email
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Update Password</h2>
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={updatePassword} className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Password
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span>Enable 2FA (placeholder)</span>
        <input
          type="checkbox"
          checked={enable2FA}
          onChange={() => setEnable2FA(!enable2FA)}
          className="w-5 h-5"
        />
      </div>

      <hr />

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
        <button onClick={deleteAccount} className="bg-red-600 text-white px-4 py-2 rounded">
          Delete Account
        </button>
      </div>
    </div>
  );
}

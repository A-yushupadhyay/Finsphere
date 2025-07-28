// src/app/api/admin/loan/approve.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") return res.status(405).end();

  const { loanId, status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  // ✅ Fetch the loan to get userId
  const loan = await db.loan.findUnique({
    where: { id: loanId },
  });

  if (!loan) {
    return res.status(404).json({ error: "Loan not found" });
  }

  // ✅ Update loan status
  await db.loan.update({
    where: { id: loanId },
    data: { status },
  });

  // ✅ Create a notification
  const message =
    status === "approved"
      ? "✅ Your loan request has been approved."
      : "❌ Your loan request has been rejected.";

  await db.notification.create({
    data: {
      userId: loan.userId,
      title: "Loan Status Update", // <-- Add a title
      message,
    },
  });

  return res.status(200).json({ success: true });
}

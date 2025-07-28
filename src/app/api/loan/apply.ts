import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { amount, tenure, interestRate } = req.body;

  if (!amount || !tenure || !interestRate) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const loan = await db.loan.create({
    data: {
      userId: session.user.id,
      amount: parseFloat(amount),
      tenure: parseInt(tenure),
      interestRate: parseFloat(interestRate),
      status: "pending",
    },
  });

  res.status(201).json({ success: true, loan });
}

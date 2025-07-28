import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  // ✅ Check if user exists
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "Recipient not found" });

  // ✅ Prevent duplicate entries
  const existing = await db.beneficiary.findFirst({
    where: { ownerId: session.user.id, recipientEmail: email },
  });
  if (existing) return res.status(409).json({ error: "Already added" });

  await db.beneficiary.create({
    data: {
      ownerId: session.user.id,
      recipientEmail: email,
    },
  });

  res.status(200).json({ message: "Beneficiary added" });
}

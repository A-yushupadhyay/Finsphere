import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "ID required" });

  const beneficiary = await db.beneficiary.findUnique({ where: { id } });

  if (!beneficiary || beneficiary.ownerId !== session.user.id) {
    return res.status(403).json({ error: "Unauthorized or not found" });
  }

  await db.beneficiary.delete({ where: { id } });

  res.status(200).json({ message: "Deleted" });
}

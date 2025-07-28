// pages/api/beneficiaries/list.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {db} from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";





export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const beneficiaries = await db.beneficiary.findMany({
    where: { ownerId: session.user.id  },
  });

  res.status(200).json(beneficiaries);
}
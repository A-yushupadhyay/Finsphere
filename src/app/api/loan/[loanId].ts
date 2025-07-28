import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { loanId } = req.query;

  const loan = await db.loan.findFirst({
    where: {
      id: String(loanId),
      userId: session.user.id,
    },
  });

  if (!loan) return res.status(404).json({ error: "Loan not found" });

  res.json(loan);
}

// POST: { title, message }
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  if (req.method !== "POST") return res.status(405).end();

  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: "Missing title or message" });
  }

  await db.supportTicket.create({
    data: {
      userId: session.user.id,
      title,
      message,
    },
  });

  return res.status(200).json({ success: true });
}

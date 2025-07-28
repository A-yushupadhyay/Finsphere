import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db"; // ✅ updated from prisma to db
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Not logged in" });

  const userId = session.user.id;

  if (req.method === "GET") {
    const notifications = await db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return res.json(notifications);
  }

  if (req.method === "POST") {
    const { title, message } = req.body;
    const notification = await db.notification.create({
      data: {
        userId,
        title,
        message,
      },
    });
    return res.status(201).json(notification);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

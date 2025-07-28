import { hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {db} from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
   // Ensure email is present and is a string
  if (!session.user.email) {
    return res.status(400).json({ error: "User email not found" });
  }
  const { password } = req.body;
  const hashed = await hash(password, 10);

  await db.user.update({
    where: { email: session.user.email },
    data: { password: hashed },
  });

  res.status(200).json({ message: "Password updated" });
}

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") {
    return new Response("Unauthorized", { status: 403 });
  }

  const { userId, freeze } = await req.json();

  await db.user.update({
    where: { id: userId },
    data: { isFrozen: freeze },
  });

  // 🔔 Send real-time freeze/unfreeze notification
  await fetch("http://localhost:3001/trigger", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      message: freeze
        ? "⛔ Your account has been frozen by admin"
        : "✅ Your account has been unfrozen",
    }),
  });

  return Response.json({ success: true });
}

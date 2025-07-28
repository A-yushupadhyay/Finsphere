import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return new Response("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const { userId } = body;

  // ✅ Approve KYC
  await db.kyc.update({
    where: { userId },
    data: { status: "approved" },
  });

  // ✅ Notify user in real-time
  await fetch("http://localhost:3001/trigger", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      message: "✅ Your KYC has been approved!",
    }),
  });

  return Response.json({ success: true });
}

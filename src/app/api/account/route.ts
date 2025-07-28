import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const account = await db.bankAccount.findFirst({
    where: { userId: session.user.id },
  });

  if (!account) return new Response("Account not found", { status: 404 });

  return Response.json(account);
}

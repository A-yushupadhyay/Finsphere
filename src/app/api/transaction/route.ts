import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { amount, description, type } = body;

  const account = await db.bankAccount.findFirst({
    where: { userId: session.user.id },
  });

  if (!account) {
    return new Response("Bank account not found", { status: 404 });
  }

  if (type === "debit" && account.balance < amount) {
    return new Response("Insufficient balance", { status: 400 });
  }

  const newBalance = type === "debit" 
    ? account.balance - amount 
    : account.balance + amount;

  await db.bankAccount.update({
    where: { id: account.id },
    data: { balance: newBalance },
  });

  const transaction = await db.transaction.create({
    data: {
      accountId: account.id,
      type,
      amount,
      description,
    },
  });

  return Response.json(transaction);
}

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name, accountNumber, ifsc, amount, description } = await req.json();

  // Basic server-side validations
  if (!name || !accountNumber || !ifsc || !amount || amount <= 0) {
    return new Response("Invalid input", { status: 400 });
  }

  try {
    // ✅ Get user + bank balance
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: { bankAccount: true },
    });

    if (!user?.bankAccount) {
      return new Response("User bank account not found", { status: 404 });
    }

    if (user.bankAccount.balance < amount) {
      return new Response("Insufficient balance", { status: 400 });
    }

    // ✅ Deduct amount
    await db.bankAccount.update({
      where: { id: user.bankAccount.id },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    // ✅ Record transaction
    await db.transaction.create({
      data: {
        accountId: user.bankAccount.id,
        amount,
        type: "debit",
        description: `Transfer to ${name} (${accountNumber}, ${ifsc}): ${description}`,
      },
    });

    // ✅ Create notification (optional)
    await db.notification.create({
      data: {
        userId: user.id,
        title: "Bank Transfer",
        message: `₹${amount} transferred to ${name} (${accountNumber})`,
      },
    });

    // ✅ Optional webhook trigger
    await fetch("http://localhost:3001/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        amount: "₹" + amount + " sent to bank",
      }),
    });

    return new Response("Transfer to bank successful", { status: 200 });
  } catch (err) {
    console.error("Transfer failed", err);
    return new Response("Internal server error", { status: 500 });
  }
}

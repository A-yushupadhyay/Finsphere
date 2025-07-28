import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { recipientEmail, amount, description } = await req.json();

    // ✅ Basic Validation
    if (!recipientEmail || !recipientEmail.includes("@")) {
      return Response.json({ error: "Invalid recipient email" }, { status: 400 });
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }

    const sender = await db.user.findUnique({
      where: { id: session.user.id },
      include: { bankAccount: true },
    });

    const receiver = await db.user.findUnique({
      where: { email: recipientEmail },
      include: { bankAccount: true },
    });

    if (!sender?.bankAccount || !receiver?.bankAccount) {
      return Response.json({ error: "Invalid sender or recipient" }, { status: 400 });
    }

    if (sender.id === receiver.id) {
      return Response.json({ error: "Cannot transfer to self" }, { status: 400 });
    }

    if (sender.bankAccount.balance < amount) {
      return Response.json({ error: "Insufficient balance" }, { status: 400 });
    }

    // ✅ Balance Update (atomic way could be added later)
    await db.$transaction([
      db.bankAccount.update({
        where: { id: sender.bankAccount.id },
        data: {
          balance: sender.bankAccount.balance - amount,
        },
      }),
      db.bankAccount.update({
        where: { id: receiver.bankAccount.id },
        data: {
          balance: receiver.bankAccount.balance + amount,
        },
      }),
      db.transaction.createMany({
        data: [
          {
            accountId: sender.bankAccount.id,
            amount,
            type: "debit",
            description: `Transfer to ${recipientEmail}: ${description}`,
          },
          {
            accountId: receiver.bankAccount.id,
            amount,
            type: "credit",
            description: `Received from ${sender.email}: ${description}`,
          },
        ],
      }),
      db.notification.create({
        data: {
          userId: sender.id,
          title: "Transfer Initiated",
          message: `You initiated a transfer of ₹${amount} to ${recipientEmail}.`,
        },
      }),
      db.notification.create({
        data: {
          userId: receiver.id,
          title: "You received money",
          message: `You received ₹${amount} from ${sender.email}.`,
        },
      }),
    ]);

    // ✅ External webhook (fail silently)
    fetch("http://localhost:3001/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: sender.id,
        amount: `₹${amount} sent`,
      }),
    }).catch((e) => console.error("Webhook failed", e));

    return Response.json({ success: true });
  } catch (error) {
    console.error("❌ Transfer error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

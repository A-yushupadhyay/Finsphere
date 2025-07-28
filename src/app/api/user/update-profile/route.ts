import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name, image } = await req.json();

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { name, image },
    });

    return new Response("Profile updated", { status: 200 });
  } catch (err) {
    console.error("Failed to update user", err);
    return new Response("Update failed", { status: 500 });
  }
}

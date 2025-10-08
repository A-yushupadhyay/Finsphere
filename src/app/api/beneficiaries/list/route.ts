// src/app/api/beneficiaries/list/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const beneficiaries = await db.beneficiary.findMany({
      where: { ownerId: session.user.id },
    });

    return NextResponse.json(beneficiaries, { status: 200 });
  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    return NextResponse.json({ error: "Failed to load beneficiaries" }, { status: 500 });
  }
}

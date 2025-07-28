import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os"; // ✅ For cross-platform temp dir

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Use cross-platform temporary directory
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, file.name);

    await writeFile(filePath, buffer);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "kyc_docs",
      public_id: `${session.user.id}-kyc`,
    });

    // ✅ Store KYC info in DB
    await db.kyc.upsert({
      where: { userId: session.user.id },
      update: {
        document: uploadResult.secure_url,
        status: "pending",
      },
      create: {
        userId: session.user.id,
        document: uploadResult.secure_url,
        status: "pending",
      },
    });

    // ✅ Create Notification
    await db.notification.create({
      data: {
        userId: session.user.id,
        title: "KYC Uploaded",
        message: "📄 Your KYC document has been uploaded and is under review.",
      },
    });

    // ✅ Clean up local temp file
    await unlink(filePath);

    return Response.json({ success: true, url: uploadResult.secure_url });
  } catch (err) {
    console.error("[KYC Upload Error]:", err);
    return new Response("Upload failed", { status: 500 });
  }
}

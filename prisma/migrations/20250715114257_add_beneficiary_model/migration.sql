-- CreateTable
CREATE TABLE "Beneficiary" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Beneficiary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

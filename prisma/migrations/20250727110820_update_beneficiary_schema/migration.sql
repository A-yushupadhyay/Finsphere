/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,recipientEmail]` on the table `Beneficiary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_ownerId_recipientEmail_key" ON "Beneficiary"("ownerId", "recipientEmail");

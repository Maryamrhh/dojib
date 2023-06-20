/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `WalletCharging` will be added. If there are existing duplicate values, this will fail.
  - The required column `order_id` was added to the `WalletCharging` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `WalletCharging` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WalletCharging" ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WalletCharging_order_id_key" ON "WalletCharging"("order_id");

-- AddForeignKey
ALTER TABLE "WalletCharging" ADD CONSTRAINT "WalletCharging_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

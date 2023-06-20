/*
  Warnings:

  - The primary key for the `Factor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Money_movement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WalletCharging` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `inbox` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Factor" DROP CONSTRAINT "Factor_moneyId_fkey";

-- DropForeignKey
ALTER TABLE "Factor" DROP CONSTRAINT "Factor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Factor" DROP CONSTRAINT "Factor_walletId_fkey";

-- AlterTable
ALTER TABLE "Factor" DROP CONSTRAINT "Factor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "moneyId" SET DATA TYPE TEXT,
ALTER COLUMN "walletId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Factor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Factor_id_seq";

-- AlterTable
ALTER TABLE "Money_movement" DROP CONSTRAINT "Money_movement_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Money_movement_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Money_movement_id_seq";

-- AlterTable
ALTER TABLE "WalletCharging" DROP CONSTRAINT "WalletCharging_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "p_link" SET DEFAULT '0',
ALTER COLUMN "p_id" SET DEFAULT '0',
ADD CONSTRAINT "WalletCharging_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WalletCharging_id_seq";

-- AlterTable
ALTER TABLE "inbox" DROP CONSTRAINT "inbox_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "inbox_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "inbox_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "Factor" ADD CONSTRAINT "Factor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factor" ADD CONSTRAINT "Factor_moneyId_fkey" FOREIGN KEY ("moneyId") REFERENCES "Money_movement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factor" ADD CONSTRAINT "Factor_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "WalletCharging"("id") ON DELETE SET NULL ON UPDATE CASCADE;

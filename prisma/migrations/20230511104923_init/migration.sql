-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phoneNumber" TEXT NOT NULL,
    "wallet" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletCharging" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "p_link" TEXT NOT NULL,
    "p_id" TEXT NOT NULL,

    CONSTRAINT "WalletCharging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Money_movement" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "sender" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,

    CONSTRAINT "Money_movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factor" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "s_c" TEXT NOT NULL DEFAULT 'charge',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "moneyId" INTEGER,
    "walletId" INTEGER,

    CONSTRAINT "Factor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "rr" TEXT NOT NULL,

    CONSTRAINT "inbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Factor" ADD CONSTRAINT "Factor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factor" ADD CONSTRAINT "Factor_moneyId_fkey" FOREIGN KEY ("moneyId") REFERENCES "Money_movement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factor" ADD CONSTRAINT "Factor_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "WalletCharging"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Protest" (
    "id" SERIAL NOT NULL,
    "debtAmount" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Protest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emolument" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "protestId" INTEGER NOT NULL,

    CONSTRAINT "Emolument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Protest_userId_idx" ON "Protest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Emolument_protestId_key" ON "Emolument"("protestId");

-- CreateIndex
CREATE INDEX "Emolument_protestId_idx" ON "Emolument"("protestId");

-- AddForeignKey
ALTER TABLE "Protest" ADD CONSTRAINT "Protest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emolument" ADD CONSTRAINT "Emolument_protestId_fkey" FOREIGN KEY ("protestId") REFERENCES "Protest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "EmolumentStatus" AS ENUM ('PAID', 'ISSUED', 'CANCELED');

-- AlterTable
ALTER TABLE "Emolument" ADD COLUMN     "status" "EmolumentStatus" NOT NULL DEFAULT 'ISSUED';

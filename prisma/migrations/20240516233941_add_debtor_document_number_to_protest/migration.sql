/*
  Warnings:

  - Added the required column `debtorDocumentNumber` to the `Protest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Protest" ADD COLUMN     "debtorDocumentNumber" TEXT NOT NULL;

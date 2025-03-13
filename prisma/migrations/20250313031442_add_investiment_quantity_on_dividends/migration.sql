/*
  Warnings:

  - Added the required column `investiment_quantity` to the `InvestimentsDividends` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvestimentsDividends" ADD COLUMN     "investiment_quantity" DOUBLE PRECISION NOT NULL;

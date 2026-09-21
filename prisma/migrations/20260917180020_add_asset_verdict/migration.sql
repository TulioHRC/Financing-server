-- CreateEnum
CREATE TYPE "AssetVerdict" AS ENUM ('BUY', 'WAIT', 'AVOID');

-- AlterTable
ALTER TABLE "AssetAnalyses" ADD COLUMN     "verdict" "AssetVerdict";

-- CreateEnum
CREATE TYPE "AnalysisCategory" AS ENUM ('PROFITABILITY', 'DEBT', 'GROWTH', 'GOVERNANCE', 'PRICE', 'DIVIDENDS');

-- CreateTable
CREATE TABLE "WatchlistAssets" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "asset_type" TEXT NOT NULL,
    "segment" TEXT,
    "description" TEXT,
    "investiment_id" TEXT,

    CONSTRAINT "WatchlistAssets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetAnalyses" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "watchlist_asset_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "observations" TEXT,

    CONSTRAINT "AssetAnalyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetAnalysisCategories" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "asset_analysis_id" TEXT NOT NULL,
    "category" "AnalysisCategory" NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "AssetAnalysisCategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistAssets_investiment_id_key" ON "WatchlistAssets"("investiment_id");

-- CreateIndex
CREATE UNIQUE INDEX "AssetAnalysisCategories_asset_analysis_id_category_key" ON "AssetAnalysisCategories"("asset_analysis_id", "category");

-- AddForeignKey
ALTER TABLE "WatchlistAssets" ADD CONSTRAINT "WatchlistAssets_investiment_id_fkey" FOREIGN KEY ("investiment_id") REFERENCES "Investiments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetAnalyses" ADD CONSTRAINT "AssetAnalyses_watchlist_asset_id_fkey" FOREIGN KEY ("watchlist_asset_id") REFERENCES "WatchlistAssets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetAnalysisCategories" ADD CONSTRAINT "AssetAnalysisCategories_asset_analysis_id_fkey" FOREIGN KEY ("asset_analysis_id") REFERENCES "AssetAnalyses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

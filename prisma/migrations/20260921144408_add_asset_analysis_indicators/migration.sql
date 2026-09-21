-- CreateTable
CREATE TABLE "AssetAnalysisIndicators" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "asset_analysis_category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,

    CONSTRAINT "AssetAnalysisIndicators_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssetAnalysisIndicators" ADD CONSTRAINT "AssetAnalysisIndicators_asset_analysis_category_id_fkey" FOREIGN KEY ("asset_analysis_category_id") REFERENCES "AssetAnalysisCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

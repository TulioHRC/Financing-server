import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalysisCategory, AssetVerdict } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

interface AssetAnalysisIndicatorInput {
  name: string;
  value: number;
  unit?: string;
}

interface AssetAnalysisCategoryInput {
  category: AnalysisCategory;
  score: number;
  comment: string;
  indicators?: AssetAnalysisIndicatorInput[];
}

/**
 * Prisma's nested `create` issues one INSERT per category/indicator, sequentially,
 * each a full round trip to the (remote) database. IDs are pre-generated here so
 * every category and every indicator can be written in a single `createMany` call
 * instead, cutting a create/update from dozens of round trips down to a handful.
 */
const buildCategoryAndIndicatorRows = (
  analysisId: string,
  categories: AssetAnalysisCategoryInput[],
) => {
  const categoryRows = categories.map((c) => ({
    id: randomUUID(),
    asset_analysis_id: analysisId,
    category: c.category,
    score: c.score,
    comment: c.comment,
  }));

  const indicatorRows = categories.flatMap((c, index) =>
    (c.indicators ?? []).map((i) => ({
      id: randomUUID(),
      asset_analysis_category_id: categoryRows[index].id,
      name: i.name,
      value: i.value,
      unit: i.unit,
    })),
  );

  return { categoryRows, indicatorRows };
};

type CategoryRow = ReturnType<
  typeof buildCategoryAndIndicatorRows
>['categoryRows'][number];
type IndicatorRow = ReturnType<
  typeof buildCategoryAndIndicatorRows
>['indicatorRows'][number];

/**
 * The transaction already returns the analysis row with real DB timestamps, so the
 * nested categories/indicators are stitched back on in memory instead of an extra
 * `findOne` round trip (which would otherwise re-fetch data we already just wrote).
 */
const attachCategoriesAndIndicators = <
  T extends { updated_at: Date; created_at: Date },
>(
  analysis: T,
  categoryRows: CategoryRow[],
  indicatorRows: IndicatorRow[],
) => ({
  ...analysis,
  categories: categoryRows.map((cat) => ({
    ...cat,
    created_at: analysis.updated_at,
    updated_at: analysis.updated_at,
    indicators: indicatorRows
      .filter((ind) => ind.asset_analysis_category_id === cat.id)
      .map((ind) => ({
        ...ind,
        unit: ind.unit ?? null,
        created_at: analysis.updated_at,
        updated_at: analysis.updated_at,
      })),
  })),
});

@Injectable()
export class AssetAnalysesService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    watchlist_asset_id: string;
    date: Date;
    observations?: string;
    verdict?: AssetVerdict;
    categories: AssetAnalysisCategoryInput[];
  }) {
    const analysisId = randomUUID();
    const { categoryRows, indicatorRows } = buildCategoryAndIndicatorRows(
      analysisId,
      data.categories,
    );

    const [createdAnalysis] = await this.prisma.$transaction([
      this.prisma.assetAnalyses.create({
        data: {
          id: analysisId,
          watchlist_asset_id: data.watchlist_asset_id,
          date: new Date(data.date),
          observations: data.observations,
          verdict: data.verdict,
        },
      }),
      this.prisma.assetAnalysisCategories.createMany({ data: categoryRows }),
      this.prisma.assetAnalysisIndicators.createMany({ data: indicatorRows }),
    ]);

    return attachCategoriesAndIndicators(
      createdAnalysis,
      categoryRows,
      indicatorRows,
    );
  }

  async findAll() {
    return this.prisma.assetAnalyses.findMany({
      include: { categories: { include: { indicators: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const analysis = await this.prisma.assetAnalyses.findUnique({
      where: { id },
      include: { categories: { include: { indicators: true } } },
    });

    if (!analysis) {
      throw new NotFoundException(`Asset analysis with id ${id} not found`);
    }

    return analysis;
  }

  async update(
    id: string,
    data: {
      date: Date;
      observations?: string;
      verdict?: AssetVerdict;
      categories: AssetAnalysisCategoryInput[];
    },
  ) {
    const { categoryRows, indicatorRows } = buildCategoryAndIndicatorRows(
      id,
      data.categories,
    );

    const [, updatedAnalysis] = await this.prisma.$transaction([
      this.prisma.assetAnalysisCategories.deleteMany({
        where: { asset_analysis_id: id },
      }),
      this.prisma.assetAnalyses.update({
        where: { id },
        data: {
          date: new Date(data.date),
          observations: data.observations,
          verdict: data.verdict,
        },
      }),
      this.prisma.assetAnalysisCategories.createMany({ data: categoryRows }),
      this.prisma.assetAnalysisIndicators.createMany({ data: indicatorRows }),
    ]);

    return attachCategoriesAndIndicators(
      updatedAnalysis,
      categoryRows,
      indicatorRows,
    );
  }

  async updateCategoryScore(
    analysisId: string,
    category: AnalysisCategory,
    score: number,
  ) {
    // No `include` here: the caller (inline star editing) already has the
    // indicators locally and isn't touching them, so skip the extra round trip.
    return this.prisma.assetAnalysisCategories.update({
      where: {
        asset_analysis_id_category: {
          asset_analysis_id: analysisId,
          category,
        },
      },
      data: { score },
    });
  }

  async remove(id: string) {
    return this.prisma.assetAnalyses.delete({
      where: { id },
    });
  }
}

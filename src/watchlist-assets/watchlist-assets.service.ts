import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const isUniqueInvestimentConflict = (error: unknown): boolean =>
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === 'P2002' &&
  (error.meta?.target as string[] | undefined)?.includes('investiment_id') ===
    true;

@Injectable()
export class WatchlistAssetsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    asset_type: string;
    segment?: string;
    description?: string;
    investiment_id?: string;
  }) {
    try {
      return await this.prisma.watchlistAssets.create({
        data,
      });
    } catch (error) {
      if (isUniqueInvestimentConflict(error)) {
        throw new ConflictException(
          'This investment is already linked to another watchlist asset.',
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.watchlistAssets.findMany();
  }

  async findOne(id: string) {
    const asset = await this.prisma.watchlistAssets.findUnique({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException(`Watchlist asset with id ${id} not found`);
    }

    return asset;
  }

  async update(
    id: string,
    data: {
      name: string;
      asset_type: string;
      segment?: string;
      description?: string;
      investiment_id?: string;
    },
  ) {
    try {
      return await this.prisma.watchlistAssets.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (isUniqueInvestimentConflict(error)) {
        throw new ConflictException(
          'This investment is already linked to another watchlist asset.',
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    return this.prisma.watchlistAssets.delete({
      where: { id },
    });
  }

  async getAnalyses(watchlistAssetId: string) {
    return this.prisma.assetAnalyses.findMany({
      where: { watchlist_asset_id: watchlistAssetId },
      include: { categories: { include: { indicators: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async getComparison() {
    const assets = await this.prisma.watchlistAssets.findMany({
      include: {
        analyses: {
          orderBy: { date: 'desc' },
          take: 1,
          include: { categories: { include: { indicators: true } } },
        },
      },
    });

    return assets.map((asset) => {
      const latestAnalysis = asset.analyses[0];
      const categories = latestAnalysis?.categories ?? [];
      const average_score =
        categories.length > 0
          ? categories.reduce((sum, c) => sum + c.score, 0) / categories.length
          : null;

      return {
        id: asset.id,
        name: asset.name,
        asset_type: asset.asset_type,
        segment: asset.segment,
        investiment_id: asset.investiment_id,
        latest_analysis_id: latestAnalysis?.id ?? null,
        latest_analysis_date: latestAnalysis?.date ?? null,
        latest_verdict: latestAnalysis?.verdict ?? null,
        average_score,
        categories: categories.map((c) => ({
          category: c.category,
          score: c.score,
          indicators: c.indicators.map((i) => ({
            name: i.name,
            value: i.value,
            unit: i.unit,
          })),
        })),
      };
    });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AnalysisCategory, AssetVerdict } from '@prisma/client';
import { AssetAnalysesService } from './asset-analyses.service';

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

@Controller('asset-analyses')
export class AssetAnalysesController {
  constructor(private readonly assetAnalysesService: AssetAnalysesService) {}

  @Post()
  async create(
    @Body()
    body: {
      watchlist_asset_id: string;
      date: Date;
      observations?: string;
      verdict?: AssetVerdict;
      categories: AssetAnalysisCategoryInput[];
    },
  ) {
    return this.assetAnalysesService.create(body);
  }

  @Get()
  async findAll() {
    return this.assetAnalysesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.assetAnalysesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      date: Date;
      observations?: string;
      verdict?: AssetVerdict;
      categories: AssetAnalysisCategoryInput[];
    },
  ) {
    return this.assetAnalysesService.update(id, body);
  }

  @Put(':id/categories/:category')
  async updateCategoryScore(
    @Param('id') id: string,
    @Param('category') category: AnalysisCategory,
    @Body() body: { score: number },
  ) {
    return this.assetAnalysesService.updateCategoryScore(
      id,
      category,
      body.score,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.assetAnalysesService.remove(id);
  }
}

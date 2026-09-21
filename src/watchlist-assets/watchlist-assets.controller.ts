import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WatchlistAssetsService } from './watchlist-assets.service';

@Controller('watchlist-assets')
export class WatchlistAssetsController {
  constructor(
    private readonly watchlistAssetsService: WatchlistAssetsService,
  ) {}

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      asset_type: string;
      segment?: string;
      description?: string;
      investiment_id?: string;
    },
  ) {
    return this.watchlistAssetsService.create(body);
  }

  @Get()
  async findAll() {
    return this.watchlistAssetsService.findAll();
  }

  @Get('comparison')
  async getComparison() {
    return this.watchlistAssetsService.getComparison();
  }

  @Get(':id/analyses')
  async getAnalyses(@Param('id') id: string) {
    return this.watchlistAssetsService.getAnalyses(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.watchlistAssetsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      name: string;
      asset_type: string;
      segment?: string;
      description?: string;
      investiment_id?: string;
    },
  ) {
    return this.watchlistAssetsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.watchlistAssetsService.remove(id);
  }
}

import { Module } from '@nestjs/common';
import { WatchlistAssetsController } from './watchlist-assets.controller';
import { WatchlistAssetsService } from './watchlist-assets.service';

@Module({
  controllers: [WatchlistAssetsController],
  providers: [WatchlistAssetsService],
})
export class WatchlistAssetsModule {}

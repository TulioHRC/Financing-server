import { Module } from '@nestjs/common';
import { AssetAnalysesController } from './asset-analyses.controller';
import { AssetAnalysesService } from './asset-analyses.service';

@Module({
  controllers: [AssetAnalysesController],
  providers: [AssetAnalysesService],
})
export class AssetAnalysesModule {}

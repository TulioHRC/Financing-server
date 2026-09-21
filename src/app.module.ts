import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CurrencyModule } from './currency/currency.module';
import { CurrencyOpeartionsModule } from './currency-operations/currency.operations.module';
import { InvestimentsModule } from './investiments/investiments.module';
import { DividendsModule } from './dividends/dividends.module';
import { OperationsModule } from './operations/operations.module';
import { PricesModule } from './prices/prices.module';
import { WatchlistAssetsModule } from './watchlist-assets/watchlist-assets.module';
import { AssetAnalysesModule } from './asset-analyses/asset-analyses.module';

@Module({
  imports: [
    PrismaModule,
    CurrencyModule,
    CurrencyOpeartionsModule,
    InvestimentsModule,
    DividendsModule,
    OperationsModule,
    PricesModule,
    WatchlistAssetsModule,
    AssetAnalysesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

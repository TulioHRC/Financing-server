import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency/currency.module';
import { CurrencyOpeartionsModule } from './currency-operations/currency.operations.module';
import { InvestimentsModule } from './investiments/investiments.module';
import { DividendsModule } from './dividends/dividends.module';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [
    CurrencyModule,
    CurrencyOpeartionsModule,
    InvestimentsModule,
    DividendsModule,
    OperationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

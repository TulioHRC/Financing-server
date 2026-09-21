import { Module } from '@nestjs/common';
import { CurrencyOpeartionsController } from './currency.operations.controller';
import { CurrencyOperationsService } from './currency.operations.service';

@Module({
  imports: [],
  controllers: [CurrencyOpeartionsController],
  providers: [CurrencyOperationsService],
})
export class CurrencyOpeartionsModule {}

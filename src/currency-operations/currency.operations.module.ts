import { Module } from '@nestjs/common';
import { CurrencyOpeartionsController } from './currency.operations.controller';
import { CurrencyOperationsService } from './currency.operations.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CurrencyOpeartionsController],
  providers: [CurrencyOperationsService, PrismaService],
})
export class CurrencyOpeartionsModule {}

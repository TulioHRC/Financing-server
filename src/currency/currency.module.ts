import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrencyOpeartionsModule } from './operations/currency.operations.module';

@Module({
  imports: [CurrencyOpeartionsModule],
  controllers: [CurrencyController],
  providers: [CurrencyService, PrismaService],
})
export class CurrencyModule {}

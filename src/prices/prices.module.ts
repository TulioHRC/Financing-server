import { Module } from '@nestjs/common';
import { PricesController } from './prices.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PricesService } from './prices.service';

@Module({
  imports: [],
  controllers: [PricesController],
  providers: [PricesService, PrismaService],
})
export class PricesModule {}

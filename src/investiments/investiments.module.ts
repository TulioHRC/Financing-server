import { Module } from '@nestjs/common';
import { InvestimentsController } from './investiments.controller';
import { InvestimentsService } from './investiments.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [InvestimentsController],
  providers: [InvestimentsService, PrismaService],
})
export class InvestimentsModule {}

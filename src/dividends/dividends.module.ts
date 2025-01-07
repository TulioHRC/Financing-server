import { Module } from '@nestjs/common';
import { DividendsController } from './dividends.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DividendsService } from './dividends.service';

@Module({
  imports: [],
  controllers: [DividendsController],
  providers: [DividendsService, PrismaService],
})
export class DividendsModule {}

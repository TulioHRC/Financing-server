import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OperationsService } from './operations.service';

@Module({
  imports: [],
  controllers: [OperationsController],
  providers: [OperationsService, PrismaService],
})
export class OperationsModule {}

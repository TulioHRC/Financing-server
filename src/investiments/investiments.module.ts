import { Module } from '@nestjs/common';
import { InvestimentsController } from './investiments.controller';
import { InvestimentsService } from './investiments.service';

@Module({
  imports: [],
  controllers: [InvestimentsController],
  providers: [InvestimentsService],
})
export class InvestimentsModule {}

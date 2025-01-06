import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { InvestimentsService } from './investiments.service';

@Controller('investiments')
export class InvestimentsController {
  constructor(private readonly investimentsService: InvestimentsService) {}

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      investiment_type: string;
      segment: string;
      currency_id: string;
    },
  ) {
    return this.investimentsService.create(body);
  }

  @Get()
  async findAll() {
    return this.investimentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.investimentsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      name: string;
      investiment_type: string;
      segment: string;
      currency_id: string;
    },
  ) {
    return this.investimentsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.investimentsService.remove(id);
  }
}

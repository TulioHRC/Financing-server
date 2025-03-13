import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DividendsService } from './dividends.service';

@Controller('dividends')
export class DividendsController {
  constructor(private readonly dividendsService: DividendsService) {}

  @Post()
  async create(
    @Body()
    body: {
      value: number;
      value_after_fees: number;
      date: Date;
      investiment_id: string;
      investiment_quantity: number;
    },
  ) {
    return this.dividendsService.create(body);
  }

  @Get()
  async findAll() {
    return this.dividendsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dividendsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      value: number;
      value_after_fees: number;
      date: Date;
      investiment_id: string;
    },
  ) {
    return this.dividendsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dividendsService.remove(id);
  }
}

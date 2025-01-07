import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PricesService } from './prices.service';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  async create(
    @Body()
    body: {
      price: number;
      investiment_id: string;
    },
  ) {
    return this.pricesService.create(body);
  }

  @Get()
  async findAll() {
    return this.pricesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pricesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      price: number;
      investiment_id: string;
    },
  ) {
    return this.pricesService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pricesService.remove(id);
  }
}

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

  @Get(':investiment_id')
  async findOne(@Param('investiment_id') investiment_id: string) {
    return this.pricesService.findOne(investiment_id);
  }

  @Put(':investiment_id')
  async update(
    @Param('investiment_id') investiment_id: string,
    @Body()
    body: {
      price: number;
    },
  ) {
    return this.pricesService.update(investiment_id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pricesService.remove(id);
  }
}

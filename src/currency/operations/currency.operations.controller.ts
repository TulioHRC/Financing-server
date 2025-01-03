import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CurrencyOperationsService } from './currency.operations.service';

@Controller('currency/operations')
export class CurrencyOpeartionsController {
  constructor(
    private readonly currencyOperationsService: CurrencyOperationsService,
  ) {}

  @Post()
  async create(
    @Body()
    body: {
      price: number;
      bought_currency_id: string;
      selled_currency_id: string;
      quantity: number;
      date: Date;
    },
  ) {
    return this.currencyOperationsService.create(body);
  }

  @Get()
  async findAll() {
    return this.currencyOperationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.currencyOperationsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      price?: number;
      bought_currency_id?: string;
      selled_currency_id?: string;
      quantity?: number;
      date?: Date;
    },
  ) {
    return this.currencyOperationsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.currencyOperationsService.remove(id);
  }
}

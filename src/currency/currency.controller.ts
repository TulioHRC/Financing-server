import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async create(@Body() body: { name: string; quotation_in_BRL: number }) {
    return this.currencyService.create(body);
  }

  @Get()
  async findAll() {
    return this.currencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.currencyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; quotation_in_BRL: number },
  ) {
    return this.currencyService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.currencyService.remove(id);
  }
}

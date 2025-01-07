import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  async create(
    @Body()
    body: {
      price: number;
      quantity: number;
      date: Date;
      investiment_id: string;
    },
  ) {
    return this.operationsService.create(body);
  }

  @Get()
  async findAll() {
    return this.operationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.operationsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      price: number;
      quantity: number;
      date: Date;
      investiment_id: string;
    },
  ) {
    return this.operationsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.operationsService.remove(id);
  }
}

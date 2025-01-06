import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CurrencyOperationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    price: number;
    bought_currency_id: string;
    selled_currency_id: string;
    quantity: number;
    date: Date;
  }) {
    data.date = new Date(data.date);

    return this.prisma.currencyOperations.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.currencyOperations.findMany();
  }

  async findOne(id: string) {
    return this.prisma.currencyOperations.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: {
      price?: number;
      bought_currency_id?: string;
      selled_currency_id?: string;
      quantity?: number;
      date?: Date;
    },
  ) {
    return this.prisma.currencyOperations.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.currencyOperations.delete({
      where: { id },
    });
  }
}

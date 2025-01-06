import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; quotation_in_BRL: number }) {
    return this.prisma.currency.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.currency.findMany();
  }

  async findOne(id: string) {
    const currency = await this.prisma.currency.findUnique({
      where: { id },
    });
    console.log(currency);

    if (!currency) {
      throw new NotFoundException(`Currency with id ${id} not found`);
    }

    return currency;
  }

  async update(id: string, data: { name: string; quotation_in_BRL: number }) {
    return this.prisma.currency.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.currency.delete({
      where: { id },
    });
  }
}

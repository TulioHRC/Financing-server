import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DividendsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    value: number;
    value_after_fees: number;
    date: Date;
    investiment_id: string;
  }) {
    data.date = new Date(data.date);

    return this.prisma.investimentsDividends.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.investimentsDividends.findMany();
  }

  async findOne(id: string) {
    const dividends = await this.prisma.investimentsDividends.findUnique({
      where: { id },
    });

    if (!dividends) {
      throw new NotFoundException(`Investiment with id ${id} not found`);
    }

    return dividends;
  }

  async update(
    id: string,
    data: {
      value: number;
      value_after_fees: number;
      date: Date;
      investiment_id: string;
    },
  ) {
    data.date = new Date(data.date);

    return this.prisma.investimentsDividends.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.investimentsDividends.delete({
      where: { id },
    });
  }
}

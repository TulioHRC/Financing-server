import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PricesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { price: number; investiment_id: string }) {
    if (this.findOne(data.investiment_id)) {
      throw new Error('Investment already exists');
    }
    return this.prisma.investimentsPrices.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.investimentsPrices.findMany();
  }

  async findOne(investiment_id: string) {
    const prices = await this.prisma.investimentsPrices.findUnique({
      where: { investiment_id },
    });

    if (!prices) {
      throw new NotFoundException(`
        Investiment with id ${investiment_id} not found`);
    }

    return prices;
  }

  async update(
    investiment_id: string,
    data: {
      price: number;
    },
  ) {
    return this.prisma.investimentsPrices.update({
      where: { investiment_id },
      data,
    });
  }

  async remove(investiment_id: string) {
    return this.prisma.investimentsPrices.delete({
      where: { investiment_id },
    });
  }
}

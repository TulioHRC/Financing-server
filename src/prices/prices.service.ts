import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PricesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { price: number; investiment_id: string }) {
    if ((await this.findOne(data.investiment_id)) !== null) {
      console.log('Investiment already exists, running PUT');
      return this.update(data.investiment_id, { price: data.price });
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
      return null;
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

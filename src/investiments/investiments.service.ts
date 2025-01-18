import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvestimentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    investiment_type: string;
    segment: string;
    currency_id: string;
  }) {
    return this.prisma.investiments.create({
      data,
    });
  }

  async findAll() {
    return (await this.prisma.investiments.findMany()).sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  async findOne(id: string) {
    const investiments = await this.prisma.investiments.findUnique({
      where: { id },
    });

    if (!investiments) {
      throw new NotFoundException(`Investiment with id ${id} not found`);
    }

    return investiments;
  }

  async update(
    id: string,
    data: {
      name: string;
      investiment_type: string;
      segment: string;
      currency_id: string;
    },
  ) {
    return this.prisma.investiments.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.investiments.delete({
      where: { id },
    });
  }
}

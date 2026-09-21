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
    investiment_quantity: number;
  }) {
    data.date = new Date(data.date);

    return this.prisma.investimentsDividends.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.investimentsDividends.findMany();
  }

  async getSummary() {
    const [grouped, investiments] = await Promise.all([
      this.prisma.investimentsDividends.groupBy({
        by: ['investiment_id'],
        _sum: { value: true, value_after_fees: true },
        _count: { id: true },
      }),
      this.prisma.investiments.findMany(),
    ]);

    const investimentsById = new Map(investiments.map((inv) => [inv.id, inv]));

    return grouped
      .map((group) => ({
        investiment_id: group.investiment_id,
        investiment_name:
          investimentsById.get(group.investiment_id)?.name ?? 'Unknown',
        total_value: group._sum.value ?? 0,
        total_value_after_fees: group._sum.value_after_fees ?? 0,
        payments_count: group._count.id,
      }))
      .sort((a, b) => b.total_value_after_fees - a.total_value_after_fees);
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

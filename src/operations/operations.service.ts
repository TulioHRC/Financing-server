import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    price: number;
    quantity: number;
    date: Date;
    investiment_id: string;
  }) {
    data.date = new Date(data.date);

    return this.prisma.investimentsOperations.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.investimentsOperations.findMany();
  }

  async findOne(id: string) {
    const operations = await this.prisma.investimentsOperations.findUnique({
      where: { id },
    });

    if (!operations) {
      throw new NotFoundException(`Operation with id ${id} not found`);
    }

    return operations;
  }

  async update(
    id: string,
    data: {
      price: number;
      quantity: number;
      date: Date;
      investiment_id: string;
    },
  ) {
    data.date = new Date(data.date);

    return this.prisma.investimentsOperations.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.investimentsOperations.delete({
      where: { id },
    });
  }

  async getMonthlyFlow() {
    const operations = await this.prisma.investimentsOperations.findMany({
      include: { investiment: { include: { currency: true } } },
    });

    if (operations.length === 0) return [];

    const flowByMonth = new Map<
      string,
      { buy_value_brl: number; sell_value_brl: number }
    >();

    for (const operation of operations) {
      const month = operation.date.toISOString().slice(0, 7);
      const value_brl =
        operation.price *
        Math.abs(operation.quantity) *
        operation.investiment.currency.quotation_in_BRL;

      const flow = flowByMonth.get(month) ?? {
        buy_value_brl: 0,
        sell_value_brl: 0,
      };

      if (operation.quantity >= 0) {
        flow.buy_value_brl += value_brl;
      } else {
        flow.sell_value_brl += value_brl;
      }

      flowByMonth.set(month, flow);
    }

    const months = Array.from(flowByMonth.keys()).sort();
    const result: {
      month: string;
      buy_value_brl: number;
      sell_value_brl: number;
      net_value_brl: number;
    }[] = [];

    let currentMonth = months[0];
    const lastMonth = months[months.length - 1];

    while (currentMonth <= lastMonth) {
      const flow = flowByMonth.get(currentMonth) ?? {
        buy_value_brl: 0,
        sell_value_brl: 0,
      };

      result.push({
        month: currentMonth,
        buy_value_brl: flow.buy_value_brl,
        sell_value_brl: flow.sell_value_brl,
        net_value_brl: flow.buy_value_brl - flow.sell_value_brl,
      });

      const [year, monthNum] = currentMonth.split('-').map(Number);
      currentMonth =
        monthNum === 12
          ? `${year + 1}-01`
          : `${year}-${String(monthNum + 1).padStart(2, '0')}`;
    }

    return result;
  }
}

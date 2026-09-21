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

  private async getPositions() {
    const [investiments, operations, prices] = await Promise.all([
      this.prisma.investiments.findMany({ include: { currency: true } }),
      this.prisma.investimentsOperations.findMany(),
      this.prisma.investimentsPrices.findMany(),
    ]);

    const priceByInvestiment = new Map(
      prices.map((price) => [price.investiment_id, price.price]),
    );

    const positionByInvestiment = new Map<
      string,
      { quantity: number; totalCost: number }
    >();

    for (const operation of operations) {
      const position = positionByInvestiment.get(operation.investiment_id) ?? {
        quantity: 0,
        totalCost: 0,
      };

      position.quantity += operation.quantity;
      position.totalCost += operation.price * operation.quantity;

      positionByInvestiment.set(operation.investiment_id, position);
    }

    return investiments.map((investiment) => {
      const position = positionByInvestiment.get(investiment.id) ?? {
        quantity: 0,
        totalCost: 0,
      };
      const average_price =
        position.quantity !== 0 ? position.totalCost / position.quantity : 0;

      return {
        id: investiment.id,
        name: investiment.name,
        investiment_type: investiment.investiment_type,
        segment: investiment.segment,
        currency_id: investiment.currency_id,
        currency_name: investiment.currency.name,
        quotation_in_BRL: investiment.currency.quotation_in_BRL,
        quantity: position.quantity,
        average_price,
        actual_price: priceByInvestiment.get(investiment.id) ?? 0,
      };
    });
  }

  async getPerformance() {
    const positions = await this.getPositions();

    return positions
      .filter((position) => position.quantity > 0)
      .map((position) => {
        const cost_value = position.quantity * position.average_price;
        const current_value = position.quantity * position.actual_price;
        const gain_value = current_value - cost_value;
        const roi_percent =
          cost_value > 0 ? (gain_value / cost_value) * 100 : 0;

        return {
          id: position.id,
          name: position.name,
          investiment_type: position.investiment_type,
          segment: position.segment,
          quantity: position.quantity,
          average_price: position.average_price,
          actual_price: position.actual_price,
          cost_value,
          current_value,
          gain_value,
          roi_percent,
        };
      })
      .sort((a, b) => b.roi_percent - a.roi_percent);
  }

  async getCurrencyExposure() {
    const positions = await this.getPositions();

    const exposureByCurrency = new Map<
      string,
      {
        currency_id: string;
        currency_name: string;
        total_value_brl: number;
        holdings_count: number;
      }
    >();

    for (const position of positions) {
      if (position.quantity <= 0) continue;

      const exposure = exposureByCurrency.get(position.currency_id) ?? {
        currency_id: position.currency_id,
        currency_name: position.currency_name,
        total_value_brl: 0,
        holdings_count: 0,
      };

      exposure.total_value_brl +=
        position.quantity * position.actual_price * position.quotation_in_BRL;
      exposure.holdings_count += 1;

      exposureByCurrency.set(position.currency_id, exposure);
    }

    const exposures = Array.from(exposureByCurrency.values());
    const total = exposures.reduce((sum, e) => sum + e.total_value_brl, 0);

    return exposures
      .map((exposure) => ({
        ...exposure,
        percentage: total > 0 ? (exposure.total_value_brl / total) * 100 : 0,
      }))
      .sort((a, b) => b.total_value_brl - a.total_value_brl);
  }
}

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
}

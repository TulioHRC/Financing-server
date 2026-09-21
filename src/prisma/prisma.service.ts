import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  // Without this, Nest's hot-reload (watch mode) never tells the old
  // PrismaClient to close its connections, so every restart leaks a fresh
  // connection pool against the database until it hits its connection limit.
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

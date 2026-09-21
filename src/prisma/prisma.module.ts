import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Global so every feature module shares this single PrismaClient (and its one
// connection pool) instead of each module instantiating its own, which was
// multiplying open connections against the database on every request.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

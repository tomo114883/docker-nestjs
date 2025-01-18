import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FactorsSetsController } from './factors-sets.controller';
import { FactorsSetsService } from './factors-sets.service';

@Module({
  imports: [PrismaModule],
  controllers: [FactorsSetsController],
  providers: [FactorsSetsService],
})
export class FactorsSetsModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FactorsBarChartService } from './factors-bar-chart.service';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';

@Module({
  imports: [PrismaModule],
  controllers: [FactorsController],
  providers: [FactorsService, FactorsBarChartService],
})
export class FactorsModule {}

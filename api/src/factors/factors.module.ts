import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FactorsChartService } from './factors-chart.service';
import { FactorsDashboardService } from './factors-dashboard.service';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';

@Module({
  imports: [PrismaModule],
  controllers: [FactorsController],
  providers: [FactorsService, FactorsChartService, FactorsDashboardService],
})
export class FactorsModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { FactorsSetModelFactory } from 'src/test.utils/factory';
import { BarChartData, BarChartInfo } from './dto/factor.dto';
import { FactorsChartService } from './factors-chart.service';
import { FactorsDashboardService } from './factors-dashboard.service';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';

describe('FactorsChartService', () => {
  let factorsChartService: FactorsChartService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const factorsBarChartModule: TestingModule = await Test.createTestingModule(
      {
        imports: [PrismaModule],
        controllers: [FactorsController],
        providers: [
          FactorsService,
          FactorsChartService,
          FactorsDashboardService,
        ],
      },
    )
      // Add the following line for the auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    factorsChartService =
      factorsBarChartModule.get<FactorsChartService>(FactorsChartService);
    prismaService = factorsBarChartModule.get<PrismaService>(PrismaService);
  });

  describe('getBarChartInfo', () => {
    it('should return data with dates of this month.', async () => {
      const factorsSet = await FactorsSetModelFactory.create();

      const result: BarChartInfo = await factorsChartService.getBarChartInfo(
        factorsSet.id,
      );

      console.log('result: ', result);
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('series');
    });
  });

  describe('getMonthlyChartData', () => {
    it('should return data with dates of this month.', async () => {
      const factorsSet = await FactorsSetModelFactory.create();
      const today = new Date();
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const result: BarChartData[] =
        await factorsChartService.getMonthlyChartData(factorsSet.id);

      expect(result[0].date).toBe(`${today.getMonth() + 1}/1`);
      expect(result.at(-1).date).toBe(
        `${lastDay.getMonth() + 1}/${lastDay.getDate()}`,
      );
    });
  });
});

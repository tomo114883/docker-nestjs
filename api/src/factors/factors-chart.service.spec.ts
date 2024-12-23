import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModelFactory } from 'src/test.utils/factory';
import { BarChartData } from './dto/factor.dto';
import { FactorsBarChartService } from './factors-bar-chart.service';
import { FactorsDashboardService } from './factors-dashboard.service';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';

describe('FactorsBarChartService', () => {
  let factorsBarChartService: FactorsBarChartService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const factorsBarChartModule: TestingModule = await Test.createTestingModule(
      {
        imports: [PrismaModule],
        controllers: [FactorsController],
        providers: [
          FactorsService,
          FactorsBarChartService,
          FactorsDashboardService,
        ],
      },
    )
      // Add to be auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    factorsBarChartService = factorsBarChartModule.get<FactorsBarChartService>(
      FactorsBarChartService,
    );
    prismaService = factorsBarChartModule.get<PrismaService>(PrismaService);
  });

  describe('getMonthlyBarChartData', () => {
    it('should return data with dates of this month.', async () => {
      const user = await UserModelFactory.create();
      const today = new Date();
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const result: BarChartData[] =
        await factorsBarChartService.getMonthlyBarChartData(user.id);

      expect(result).toBeDefined();
      expect(result[0].date).toBe(`${today.getMonth() + 1}/1`);
      expect(result.at(-1).date).toBe(
        `${lastDay.getMonth() + 1}/${lastDay.getDate()}`,
      );
    });
  });
});

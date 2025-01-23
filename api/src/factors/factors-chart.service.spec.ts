import { faker } from '@faker-js/faker';
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
  let factorsService: FactorsService;
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
    factorsService = factorsBarChartModule.get<FactorsService>(FactorsService);
    prismaService = factorsBarChartModule.get<PrismaService>(PrismaService);
  });

  describe('getBarChartInfo', () => {
    it('should return data with dates of this month.', async () => {
      const factorsSet = await FactorsSetModelFactory.create();

      const result: BarChartInfo = await factorsChartService.getBarChartInfo(
        factorsSet.id,
      );

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

    it('should return data is sum of each weights.', async () => {
      const factorsSet = await FactorsSetModelFactory.create();
      const date = new Date();
      const today = date.getDate();

      const motivatorDto = {
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 1, max: 5 }),
          variable: faker.datatype.boolean(),
          factorsSetId: factorsSet.id,
        },
      };
      const stressorDto = {
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 1, max: 5 }),
          variable: faker.datatype.boolean(),
          factorsSetId: factorsSet.id,
        },
      };

      await prismaService.motivator.create(motivatorDto);
      await prismaService.stressor.create(stressorDto);

      // Obtain monthly-chart-data from DB.
      const result: BarChartData[] =
        await factorsChartService.getMonthlyChartData(factorsSet.id);

      expect(result.at(today - 1).motiv).toBe(motivatorDto.data.weight);
      expect(result.at(today - 1).stress).toBe(stressorDto.data.weight);
    });
  });
});

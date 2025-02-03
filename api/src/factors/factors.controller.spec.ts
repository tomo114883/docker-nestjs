import { faker } from '@faker-js/faker';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateFactorDto } from './dto/create-factor.dto';
import { FactorsChartService } from './factors-chart.service';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';

describe('FactorsController', () => {
  let factorsController: FactorsController;
  let factorsService: DeepMocked<FactorsService>;
  let factorsChartService: DeepMocked<FactorsChartService>;

  beforeEach(async () => {
    const factorsModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [FactorsController],
      providers: [
        {
          provide: FactorsService,
          useValue: createMock<FactorsService>(),
        },
        {
          provide: FactorsChartService,
          useValue: createMock<FactorsChartService>(),
        },
      ],
    }).compile();

    factorsController = factorsModule.get<FactorsController>(FactorsController);
    factorsService =
      factorsModule.get<DeepMocked<FactorsService>>(FactorsService);
    factorsChartService =
      factorsModule.get<DeepMocked<FactorsChartService>>(FactorsChartService);
  });

  describe('getBarChartInfo', () => {
    it('should call getBarChartInfo() of the service with appropriate args.', async () => {
      const factorsSetId = '1';

      await factorsController.getBarChartInfo(factorsSetId);

      expect(factorsChartService.getBarChartInfo).toHaveBeenCalledWith(
        Number(factorsSetId),
      );
    });
  });

  describe('getMonthlyChartData', () => {
    it('should call getMonthlyChartData() of the service with appropriate args.', async () => {
      const factorsSetId = '1';

      await factorsController.getMonthlyChartData(factorsSetId);

      expect(factorsChartService.getMonthlyChartData).toHaveBeenCalledWith(
        Number(factorsSetId),
      );
    });
  });

  describe('create', () => {
    it('should call create() of the service with appropriate args.', async () => {
      const factorsSetId = '1';
      const factor = 'motivator';

      const dto: CreateFactorDto = {
        name: faker.word.noun(),
        weight: faker.number.int(),
        variable: faker.datatype.boolean(),
      };

      await factorsController.create(factorsSetId, factor, dto);

      expect(factorsService.create).toHaveBeenCalledWith(
        Number(factorsSetId),
        factor,
        dto,
      );
    });
  });

  describe('findFactors', () => {
    it('should call findFactors() of the service with appropriate args.', async () => {
      const factorsSetId = '1';
      const factor = 'motivator';

      await factorsController.findFactors(factorsSetId, factor);
      expect(factorsService.findFactors).toHaveBeenCalledWith(
        Number(factorsSetId),
        factor,
      );
    });
  });
});

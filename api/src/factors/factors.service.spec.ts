import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { FactorsSetModelFactory } from 'src/test.utils/factory';
import { FactorsService } from './factors.service';

describe('FactorsService', () => {
  let factorsService: FactorsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const factorsModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [FactorsService],
    })
      // Add the following line for the auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    factorsService = factorsModule.get<FactorsService>(FactorsService);
    prismaService = factorsModule.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('create a new factor in the DB when the data is entered.', async () => {
      const factorsSet = await FactorsSetModelFactory.create();

      // input data as dto.
      const dto = {
        name: faker.word.noun(),
        weight: faker.number.int({ min: 1, max: 5 }),
        variable: faker.datatype.boolean(),
      };

      //  Create a motivator.
      const motivator = await factorsService.create(
        factorsSet.id,
        'motivator',
        dto,
      );

      // Get from the DB to verify if a new factor was created.
      const result = await prismaService.motivator.findUnique({
        where: { id: motivator.id },
      });

      // Assert if the created motiv is correct with the input data.
      expect(motivator.name).toBe(dto.name);
      expect(motivator.weight).toBe(dto.weight);
      expect(motivator.variable).toBe(dto.variable);
      expect(result.name).toBe(dto.name);
      expect(result.weight).toBe(dto.weight);
      expect(result.variable).toBe(dto.variable);
    });
  });

  describe('findFactors', () => {
    it('get all motiv when the data is entered.', async () => {
      const factorsSet = await FactorsSetModelFactory.create();

      // Create a Factor by the prismaService.
      const factor = await prismaService.motivator.create({
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 1, max: 5 }),
          variable: faker.datatype.boolean(),
          factorsSetId: factorsSet.id,
        },
      });

      // Obtain all factors.
      const foundFactors = await factorsService.findFactors(
        factorsSet.id,
        'motivator',
      );

      expect(foundFactors[0].id).toBe(factor.id);
      expect(foundFactors[0].name).toBe(factor.name);
      expect(foundFactors[0].weight).toBe(factor.weight);
      expect(foundFactors[0].factorsSetId).toBe(factor.factorsSetId);
    });
  });
});

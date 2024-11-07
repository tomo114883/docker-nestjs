import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { FactorModelFactory, UserModelFactory } from 'src/test.utils/factory';
import { FactorsService } from './factors.service';

describe('FactorsService', () => {
  let factorsService: FactorsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const factorsModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [FactorsService],
    })
      // Add to be auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    factorsService = factorsModule.get<FactorsService>(FactorsService);
    prismaService = factorsModule.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('create a new factor in the DB when the data is entered.', async () => {
      // Create a user and use a type.
      const user = await UserModelFactory.create();
      const type = await TypeModelFactory.create();

      // Prepare for a data to create a motiv and check the test.
      const input = {
        name: faker.word.noun(), // Using faker, we can be easy.
        weight: faker.number.int({ min: 1, max: 5 }),
        userId: user.id,
        typeId: type.id,
      };

      // Use create-method from factorsService and create a motiv.
      const factor = await factorsService.create(input);

      // Get from the DB to verify if a new factor was created.
      const result = await prismaService.factor.findUnique({
        where: { id: factor.id },
      });

      // Assert if the created motiv is correct with the input data.
      expect(factor.id).not.toBeNull();
      expect(factor.name).toBe(input.name);
      expect(factor.weight).toBe(input.weight);
      expect(factor.userId).toBe(user.id);
      expect(factor.typeId).toBe(type.id);
      expect(factor.createdAt).not.toBeNull();
      expect(factor.updatedAt).not.toBeNull();
      expect(factor.deletedAt).toBeNull();
      expect(result.id).not.toBeNull();
      expect(result.name).toBe(input.name);
      expect(result.weight).toBe(input.weight);
      expect(result.userId).toBe(user.id);
      expect(result.typeId).toBe(type.id);
      expect(result.createdAt).not.toBeNull();
      expect(result.updatedAt).not.toBeNull();
      expect(result.deletedAt).toBeNull();
    });
  });

  describe('findAll', () => {
    it('get all motiv when the data is entered.', async () => {
      // Create a Factor.
      const factor = await FactorModelFactory.create();

      // Obtain all factors.
      const fetchedFactor = await factorsService.findAll();

      expect(fetchedFactor[0].id).toBe(factor.id);
      expect(fetchedFactor[0].name).toBe(factor.name);
      expect(fetchedFactor[0].weight).toBe(factor.weight);
      expect(fetchedFactor[0].userId).toBe(factor.userId);
      expect(fetchedFactor[0].typeId).toBe(factor.typeId);
      expect(fetchedFactor[0].createdAt).toStrictEqual(factor.createdAt);
      expect(fetchedFactor[0].updatedAt).toStrictEqual(factor.updatedAt);
      expect(fetchedFactor[0].deletedAt).toBeNull();
    });
  });

  describe('findOne', () => {
    it('fetch the appropriate motiv when the id is entered.', async () => {
      const factor = await FactorModelFactory.create();

      const fetchedFactor = await factorsService.findOne(factor.id);

      expect(fetchedFactor.id).toBe(factor.id);
      expect(fetchedFactor.name).toBe(factor.name);
      expect(fetchedFactor.weight).toBe(factor.weight);
      expect(fetchedFactor.userId).toBe(factor.userId);
      expect(fetchedFactor.typeId).toBe(factor.typeId);
      expect(fetchedFactor.createdAt).toStrictEqual(factor.createdAt);
      expect(fetchedFactor.updatedAt).toStrictEqual(factor.updatedAt);
      expect(fetchedFactor.deletedAt).toBeNull();
    });
  });

  describe('update', () => {
    it('update the appropriate motiv when the id and the data are entered.', async () => {
      // Create a motiv.
      const factor = await FactorModelFactory.create();

      // Create a type to be used as its ID.
      const type = await TypeModelFactory.create();

      // Prepare for a data to update a motiv and check the test.
      const input = {
        weight: faker.number.int({ min: 1, max: 5 }),
        typeId: type.id,
      };

      // Update a motiv by the data i created.
      const result = await factorsService.update(factor.id, input);

      expect(result.id).toBe(factor.id);
      expect(result.weight).toBe(input.weight);
      expect(result.typeId).toBe(input.typeId);
      expect(result.createdAt).toStrictEqual(factor.createdAt);
      expect(result.updatedAt).not.toStrictEqual(factor.updatedAt);
      expect(result.deletedAt).toBeNull();
    });

    it('throw the error when the corresponding motiv does not exist.', async () => {
      // Create a type to be used as its ID.
      const type = await TypeModelFactory.create();

      // Prepare for a data to update a motiv and check the test.
      const data = {
        weight: faker.number.int({ min: 1, max: 5 }),
        typeId: type.id,
      };

      // Update a motiv by the data is created.
      await expect(
        factorsService.update(faker.number.int({ max: 2147483647 }), data),
      ).rejects.toThrow('The corresponding factor does not exist.');
    });
  });

  describe('remove', () => {
    it('return the deleted motiv when the id is entered.', async () => {
      const factor = await FactorModelFactory.create();

      // Remove a motiv.
      const deletedId = await factorsService.remove(factor.id);

      // Assert if the deleted ID of motiv is correct with the motiv ID.
      expect(deletedId).toBe(factor.id);
    });

    it('throw the error when the corresponding motiv does not exist.', async () => {
      await expect(
        factorsService.remove(faker.number.int({ max: 2147483647 })),
      ).rejects.toThrow('The corresponding factor does not exist.');
    });
  });

  describe('totalCalculation', () => {
    it('calculate sum of weight per user when the id is entered.', async () => {
      const user = await UserModelFactory.create();

      const createdFactor = await prismaService.factor.create({
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 1, max: 5 }),
          userId: user.id,
        },
      });

      // Calculate factor level that is sum of each factor's weight per user.
      const factorLevel = await factorsService.totalCalculation(user.id);

      expect(factorLevel).toBe(createdFactor.weight);
    });

    it('Return 0 when the factors do not exist in the DB.', async () => {
      const user = await UserModelFactory.create();

      // Calculate factor level that is sum of each factor's weight per user.
      const result = await factorsService.totalCalculation(user.id);
      expect(result).toBe(0);
    });
  });
});

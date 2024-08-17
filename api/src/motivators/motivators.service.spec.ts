import { Test, TestingModule } from '@nestjs/testing';
import { MotivatorsService } from './motivators.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import {
  MotivatorModelFactory,
  TypeModelFactory,
  UserModelFactory,
} from 'src/test.utils/factory';
import { faker } from '@faker-js/faker';

describe('MotivatorsService', () => {
  let motivatorsService: MotivatorsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const motivatorsModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MotivatorsService],
    })
      // Add to be auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    motivatorsService =
      motivatorsModule.get<MotivatorsService>(MotivatorsService);
    prismaService = motivatorsModule.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('create a new motivator in the DB when the data is entered.', async () => {
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

      // Use create-method from motivatorsService and create a motiv.
      const motivator = await motivatorsService.create(input);

      // Get from the DB to verify if a new motivator was created.
      const result = await prismaService.motivator.findUnique({
        where: { id: motivator.id },
      });

      // Assert if the created motiv is correct with the input data.
      expect(motivator.id).not.toBeNull();
      expect(motivator.name).toBe(input.name);
      expect(motivator.weight).toBe(input.weight);
      expect(motivator.userId).toBe(user.id);
      expect(motivator.typeId).toBe(type.id);
      expect(motivator.createdAt).not.toBeNull();
      expect(motivator.updatedAt).not.toBeNull();
      expect(motivator.deletedAt).toBeNull();
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
      // Create a Motivator.
      const motivator = await MotivatorModelFactory.create();

      // Obtain all motivators.
      const fetchedMotivator = await motivatorsService.findAll();

      expect(fetchedMotivator[0].id).toBe(motivator.id);
      expect(fetchedMotivator[0].name).toBe(motivator.name);
      expect(fetchedMotivator[0].weight).toBe(motivator.weight);
      expect(fetchedMotivator[0].userId).toBe(motivator.userId);
      expect(fetchedMotivator[0].typeId).toBe(motivator.typeId);
      expect(fetchedMotivator[0].createdAt).toStrictEqual(motivator.createdAt);
      expect(fetchedMotivator[0].updatedAt).toStrictEqual(motivator.updatedAt);
      expect(fetchedMotivator[0].deletedAt).toBeNull();
    });
  });

  describe('findOne', () => {
    it('fetch the appropriate motiv when the id is entered.', async () => {
      const motivator = await MotivatorModelFactory.create();

      const fetchedMotivator = await motivatorsService.findOne(motivator.id);

      expect(fetchedMotivator.id).toBe(motivator.id);
      expect(fetchedMotivator.name).toBe(motivator.name);
      expect(fetchedMotivator.weight).toBe(motivator.weight);
      expect(fetchedMotivator.userId).toBe(motivator.userId);
      expect(fetchedMotivator.typeId).toBe(motivator.typeId);
      expect(fetchedMotivator.createdAt).toStrictEqual(motivator.createdAt);
      expect(fetchedMotivator.updatedAt).toStrictEqual(motivator.updatedAt);
      expect(fetchedMotivator.deletedAt).toBeNull();
    });
  });

  describe('update', () => {
    it('update the appropriate motiv when the id and the data are entered.', async () => {
      // Create a motiv.
      const motivator = await MotivatorModelFactory.create();

      // Create a type to be used as its ID.
      const type = await TypeModelFactory.create();

      // Prepare for a data to update a motiv and check the test.
      const input = {
        weight: faker.number.int({ min: 1, max: 5 }),
        typeId: type.id,
      };

      // Update a motiv by the data i created.
      const result = await motivatorsService.update(motivator.id, input);

      expect(result.id).toBe(motivator.id);
      expect(result.weight).toBe(input.weight);
      expect(result.typeId).toBe(input.typeId);
      expect(result.createdAt).toStrictEqual(motivator.createdAt);
      expect(result.updatedAt).not.toStrictEqual(motivator.updatedAt);
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
        motivatorsService.update(faker.number.int({ max: 2147483647 }), data),
      ).rejects.toThrow('The corresponding motivator does not exist.');
    });
  });

  describe('remove', () => {
    it('return the deleted motiv when the id is entered.', async () => {
      const motivator = await MotivatorModelFactory.create();

      // Remove a motiv.
      const deletedId = await motivatorsService.remove(motivator.id);

      // Assert if the deleted ID of motiv is correct with the motiv ID.
      expect(deletedId).toBe(motivator.id);
    });

    it('throw the error when the corresponding motiv does not exist.', async () => {
      await expect(
        motivatorsService.remove(faker.number.int({ max: 2147483647 })),
      ).rejects.toThrow('The corresponding motivator does not exist.');
    });
  });

  describe('totalCalculation', () => {
    it('calculate sum of weight per user when the id is entered.', async () => {
      const user = await UserModelFactory.create();

      const createdMotivator = await prismaService.motivator.create({
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 1, max: 5 }),
          userId: user.id,
        },
      });

      // Calculate motivator level that is sum of each motivator's weight per user.
      const motivatorLevel = await motivatorsService.totalCalculation(user.id);

      expect(motivatorLevel).toBe(createdMotivator.weight);
    });

    it('Return 0 when the motivators do not exist in the DB.', async () => {
      const user = await UserModelFactory.create();

      // Calculate motivator level that is sum of each motivator's weight per user.
      const result = await motivatorsService.totalCalculation(user.id);
      expect(result).toBe(0);
    });
  });
});

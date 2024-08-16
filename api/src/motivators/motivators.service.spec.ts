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
    it('create a new motivator in the DB when data is entered.', async () => {
      // Create a user and use a type.
      const user = await UserModelFactory.create();
      const type = await TypeModelFactory.create();

      // Prepare for a data to create a motiv and check the test.
      const data = {
        name: faker.word.noun(), // Using faker, we can be easy.
        weight: faker.number.int({ min: 1, max: 5 }),
        userId: user.id,
        typeId: type.id,
      };

      // Use create-method from motivatorsService and create a motiv.
      const motivator = await motivatorsService.create(data);

      // Assert if the created motiv is correct with the input data.
      expect(motivator.id).not.toBeNull();
      expect(motivator.name).toBe(data.name); // Use data here.
      expect(motivator.weight).toBe(data.weight);
      expect(motivator.userId).toBe(user.id);
      expect(motivator.typeId).toBe(type.id);
      expect(motivator.createdAt).not.toBeNull();
      expect(motivator.updatedAt).not.toBeNull();
      expect(motivator.deletedAt).toBeNull();
    });
  });

  describe('findAll', () => {
    it('get all motiv when data is entered.', async () => {
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
    it('fetch the appropriate motiv when id is entered.', async () => {
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
    it('update the appropriate motiv when id and data are entered.', async () => {
      // Create a motiv.
      const motivator = await MotivatorModelFactory.create();

      // Create a type to be used as its ID.
      const type = await TypeModelFactory.create();

      // Prepare for a data to update a motiv and check the test.
      const data = {
        weight: faker.number.int({ min: 1, max: 5 }),
        typeId: type.id,
      };

      // Update a motiv by the data i created.
      const updatedMotivator = await motivatorsService.update(
        motivator.id,
        data,
      );

      expect(updatedMotivator.id).toBe(motivator.id);
      expect(updatedMotivator.weight).toBe(data.weight);
      expect(updatedMotivator.typeId).toBe(data.typeId);
      expect(updatedMotivator.createdAt).toStrictEqual(motivator.createdAt);
      expect(updatedMotivator.updatedAt).not.toStrictEqual(motivator.updatedAt);
      expect(updatedMotivator.deletedAt).toBeNull();
    });
  });

  describe('remove', () => {
    it('return the deleted motiv when id is entered.', async () => {
      const motivator = await MotivatorModelFactory.create();

      // Remove a motiv.
      const deletedId = await motivatorsService.remove(motivator.id);

      // Assert if the deleted ID of motiv is correct with the motiv ID.
      expect(deletedId).toBe(motivator.id);
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
  });
});

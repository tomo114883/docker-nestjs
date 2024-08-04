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
  let service: MotivatorsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MotivatorsService],
    })
      // Add to be auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    service = module.get<MotivatorsService>(MotivatorsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create-method', () => {
    it('When data is entered, a new motivator must be created in the DB.', async () => {
      // console.log('🙌_start!!!!!');
      // Create a user and use type.
      const user = await UserModelFactory.create();
      const type = await TypeModelFactory.create();

      // Prepare for a data to create a motiv and check the test.
      const data = {
        name: faker.word.noun(), // Using faker, we can be easy.
        weight: faker.number.int({ min: 1, max: 5 }),
        userId: user.id,
        typeId: type.id,
      };

      // Use create-method from service and create a motiv.
      const motivator = await service.create(data);
      // console.log('🙌_check!!!!!', motivator);

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

  describe('findAll-method', () => {
    it('All motiv must be obtained.', async () => {
      // console.log('🙌_start!!!!!');
      // Create a Motivator.
      const motivator = await MotivatorModelFactory.create();

      // Obtain all motivators.
      const fetchedMotivator = await service.findAll();
      // console.log('🙌_check!!!!!', fetchedMotivator);
      // Same above
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

  describe('findOne-method', () => {
    it('When id is entered, the appropriate motiv must be fetched.', async () => {
      // Sama above.
      const motivator = await MotivatorModelFactory.create();

      // Same above.
      const fetchedMotivator = await service.findOne(motivator.id);

      // Same above.
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

  describe('update-method', () => {
    it('When id and data are entered, the appropriate motiv must be updated.', async () => {
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
      const updatedMotivator = await service.update(motivator.id, data);

      // Same above.
      expect(updatedMotivator.id).toBe(motivator.id);
      expect(updatedMotivator.weight).toBe(data.weight);
      expect(updatedMotivator.typeId).toBe(data.typeId);
      expect(updatedMotivator.createdAt).toStrictEqual(motivator.createdAt);
      expect(updatedMotivator.updatedAt).not.toStrictEqual(motivator.updatedAt);
      expect(updatedMotivator.deletedAt).toBeNull();
    });
  });

  describe('remove-method', () => {
    it('When id is entered, the deleted motiv must be returned.', async () => {
      // Same above.
      const motivator = await MotivatorModelFactory.create();

      // Remove a motiv.
      const deletedId = await service.remove(motivator.id);

      // Assert if the deleted ID of motiv is correct with the motiv ID.
      expect(deletedId).toBe(motivator.id);
    });
  });

  describe('totalCalculation-method', () => {
    it('Calculate sum of weight per user.', async () => {
      // Same above.
      const user = await UserModelFactory.create();

      const createdMotivator = await prisma.motivator.create({
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 1, max: 5 }),
          userId: user.id,
        },
      });

      // Calculate motivator level that is sum of each motivator's weight per user.
      const motivatorLevel = await service.totalCalculation(user.id);

      expect(motivatorLevel).toBe(createdMotivator.weight);
    });
  });
});

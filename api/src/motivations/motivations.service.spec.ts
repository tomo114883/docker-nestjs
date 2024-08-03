import { Test, TestingModule } from '@nestjs/testing';
import { MotivationsService } from './motivations.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import {
  MotivationModelFactory,
  TypeModelFactory,
  UserModelFactory,
} from 'src/test.utils/factory';
import { faker } from '@faker-js/faker';

describe('MotivationsService', () => {
  let service: MotivationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MotivationsService],
    })
      // Add to be auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    service = module.get<MotivationsService>(MotivationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create-method', () => {
    it('When data is entered, a new motivation must be created in the DB.', async () => {
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
      const motivation = await service.create(data);
      // console.log('🙌_check!!!!!', motivation);

      // Assert if the created motiv is correct with the input data.
      expect(motivation.id).not.toBeNull();
      expect(motivation.name).toBe(data.name); // Use data here.
      expect(motivation.weight).toBe(data.weight);
      expect(motivation.userId).toBe(user.id);
      expect(motivation.typeId).toBe(type.id);
      expect(motivation.createdAt).not.toBeNull();
      expect(motivation.updatedAt).not.toBeNull();
      expect(motivation.deletedAt).toBeNull();
    });
  });

  describe('findAll-method', () => {
    it('All motiv must be obtained.', async () => {
      // console.log('🙌_start!!!!!');
      // Create a Motivation.
      const motivation = await MotivationModelFactory.create();

      // Obtain all motivations.
      const fetchedMotivation = await service.findAll();
      // console.log('🙌_check!!!!!', fetchedMotivation);
      // Same above
      expect(fetchedMotivation[0].id).toBe(motivation.id);
      expect(fetchedMotivation[0].name).toBe(motivation.name);
      expect(fetchedMotivation[0].weight).toBe(motivation.weight);
      expect(fetchedMotivation[0].userId).toBe(motivation.userId);
      expect(fetchedMotivation[0].typeId).toBe(motivation.typeId);
      expect(fetchedMotivation[0].createdAt).toStrictEqual(
        motivation.createdAt,
      );
      expect(fetchedMotivation[0].updatedAt).toStrictEqual(
        motivation.updatedAt,
      );
      expect(fetchedMotivation[0].deletedAt).toBeNull();
    });
  });

  describe('findOne-method', () => {
    it('When id is entered, the appropriate motiv must be fetched.', async () => {
      // Sama above.
      const motivation = await MotivationModelFactory.create();

      // Same above.
      const fetchedMotivation = await service.findOne(motivation.id);

      // Same above.
      expect(fetchedMotivation.id).toBe(motivation.id);
      expect(fetchedMotivation.name).toBe(motivation.name);
      expect(fetchedMotivation.weight).toBe(motivation.weight);
      expect(fetchedMotivation.userId).toBe(motivation.userId);
      expect(fetchedMotivation.typeId).toBe(motivation.typeId);
      expect(fetchedMotivation.createdAt).toStrictEqual(motivation.createdAt);
      expect(fetchedMotivation.updatedAt).toStrictEqual(motivation.updatedAt);
      expect(fetchedMotivation.deletedAt).toBeNull();
    });
  });

  describe('update-method', () => {
    it('When id and data are entered, the appropriate motiv must be updated.', async () => {
      // Create a motiv.
      const motivation = await MotivationModelFactory.create();

      // Create a type to be used as its ID.
      const type = await TypeModelFactory.create();

      // Prepare for a data to update a motiv and check the test.
      const data = {
        weight: faker.number.int({ min: 1, max: 5 }),
        typeId: type.id,
      };

      // Update a motiv by the data i created.
      const updatedMotivation = await service.update(motivation.id, data);

      // Same above.
      expect(updatedMotivation.id).toBe(motivation.id);
      expect(updatedMotivation.weight).toBe(data.weight);
      expect(updatedMotivation.typeId).toBe(data.typeId);
      expect(updatedMotivation.createdAt).toStrictEqual(motivation.createdAt);
      expect(updatedMotivation.updatedAt).not.toStrictEqual(
        motivation.updatedAt,
      );
      expect(updatedMotivation.deletedAt).toBeNull();
    });
  });

  describe('remove-method', () => {
    it('When id is entered, the deleted motiv must be returned.', async () => {
      // Same above.
      const motivation = await MotivationModelFactory.create();

      // Remove a motiv.
      const deletedId = await service.remove(motivation.id);

      // Assert if the deleted ID of motiv is correct with the motiv ID.
      expect(deletedId).toBe(motivation.id);
    });
  });

  describe('totalCalculation-method', () => {
    it('Calculate sum of weight per user.', async () => {
      // Same above.
      const user = await UserModelFactory.create();

      const createdMotivator = await prisma.motivation.create({
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 1, max: 5 }),
          userId: user.id,
        },
      });

      // Calculate motivation level that is sum of each motivator's weight per user.
      const motivationLevel = await service.totalCalculation(user.id);

      expect(motivationLevel).toBe(createdMotivator.weight);
    });
  });
});

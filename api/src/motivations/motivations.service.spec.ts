import { Test, TestingModule } from '@nestjs/testing';
import { MotivationsService } from './motivations.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModelFactory } from 'src/test.utils/factory';
import { faker } from '@faker-js/faker';

describe('MotivationsService', () => {
  let service: MotivationsService;

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
  });

  describe('create-method', () => {
    it('When data is entered, a new motivation is created in the DB.', async () => {
      // Create a user.
      const user = await UserModelFactory.create();

      // Prepare for a data to create a motiv and check the test.
      const data = {
        name: faker.word.noun(), // Using faker, we can be easy.
        userId: user.id,
      };

      // Use create-method from service and create a motiv.
      const motivation = await service.create(data);

      // Assert the created motiv.
      expect(motivation.id).not.toBeNull();
      expect(motivation.name).toBe(data.name); // Use data here.
      expect(motivation.userId).toBe(user.id);
    });
  });
});

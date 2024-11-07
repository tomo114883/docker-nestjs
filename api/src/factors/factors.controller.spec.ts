import { faker } from '@faker-js/faker';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FactorModelFactory, UserModelFactory } from 'src/test.utils/factory';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';

describe('FactorsController', () => {
  let factorsController: FactorsController;
  let factorsService: DeepMocked<FactorsService>;

  beforeEach(async () => {
    const factorsModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [FactorsController],
      providers: [
        {
          provide: FactorsService,
          useValue: createMock<FactorsService>(),
        },
      ],
    }).compile();

    factorsController = factorsModule.get<FactorsController>(FactorsController);
    factorsService =
      factorsModule.get<DeepMocked<FactorsService>>(FactorsService);
  });

  describe('create', () => {
    it('call the appropriate method and use the input data.', async () => {
      const user = await UserModelFactory.create();
      const type = await TypeModelFactory.create();

      // Create a input data.
      const input = {
        name: faker.word.noun(),
        weight: faker.number.int({ min: 1, max: 5 }),
        userId: user.id,
        typeId: type.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      // Trigger this Controller method to test its functionality.
      // By calling this method, the mocked Service can be available.
      await factorsController.create(input);

      // Verify that the appropriate Service mothod is called and given the argument.
      expect(factorsService.create).toHaveBeenCalledWith(input);
    });
  });

  describe('findAll', () => {
    it('call the appropriate method and use the input data.', async () => {
      await factorsController.findAll();

      expect(factorsService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('call the appropriate method and use the input data.', async () => {
      const factor = await FactorModelFactory.create();

      await factorsController.findOne(factor.id);

      expect(factorsService.findOne).toHaveBeenCalledWith(factor.id);
    });
  });

  describe('update', () => {
    it('call the appropriate method and use the input data.', async () => {
      const factor = await FactorModelFactory.create();
      const type = await TypeModelFactory.create();

      const input = {
        name: faker.word.noun(),
        weight: faker.number.int({ min: 1, max: 5 }),
        typeId: type.id,
      };

      await factorsController.update(factor.id, input);

      expect(factorsService.update).toHaveBeenCalledWith(factor.id, input);
    });
  });

  describe('remove', () => {
    it('call the appropriate method and use the input data.', async () => {
      const factor = await FactorModelFactory.create();

      await factorsController.remove(factor.id);

      expect(factorsService.remove).toHaveBeenCalledWith(factor.id);
    });
  });
});

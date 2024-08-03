import { Test, TestingModule } from '@nestjs/testing';
import { MotivationsController } from './motivations.controller';
import { MotivationsService } from './motivations.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { faker } from '@faker-js/faker';
import {
  MotivationModelFactory,
  TypeModelFactory,
  UserModelFactory,
} from 'src/test.utils/factory';

describe('MotivationsController', () => {
  let controller: MotivationsController;
  let motivationsService: DeepMocked<MotivationsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotivationsController],
      providers: [
        {
          provide: MotivationsService,
          useValue: createMock<MotivationsService>(),
        },
      ],
    }).compile();

    controller = module.get<MotivationsController>(MotivationsController);
    motivationsService =
      module.get<DeepMocked<MotivationsService>>(MotivationsService);
  });

  describe('create-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
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
      await controller.create(input);

      // Verify that the appropriate Service mothod is called and given the argument.
      expect(motivationsService.create).toHaveBeenCalledWith(input);
    });
  });

  describe('findAll-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
      await controller.findAll();

      expect(motivationsService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
      const motivation = await MotivationModelFactory.create();

      // Same above.
      await controller.findOne(motivation.id);

      // Same above.
      expect(motivationsService.findOne).toHaveBeenCalledWith(motivation.id);
    });
  });

  describe('update-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
      // Same above.
      const motivation = await MotivationModelFactory.create();
      const type = await TypeModelFactory.create();

      // Same above.
      const input = {
        name: faker.word.noun(),
        weight: faker.number.int({ min: 1, max: 5 }),
        typeId: type.id,
      };

      // Same above.
      await controller.update(motivation.id, input);

      // Same above.
      expect(motivationsService.update).toHaveBeenCalledWith(
        motivation.id,
        input,
      );
    });
  });

  describe('remove-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
      // Same above.
      const motivation = await MotivationModelFactory.create();

      // Same above.
      await controller.remove(motivation.id);

      // Same above.
      expect(motivationsService.remove).toHaveBeenCalledWith(motivation.id);
    });
  });
});

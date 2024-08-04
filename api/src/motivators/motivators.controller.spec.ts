import { Test, TestingModule } from '@nestjs/testing';
import { MotivatorsController } from './motivators.controller';
import { MotivatorsService } from './motivators.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { faker } from '@faker-js/faker';
import {
  MotivatorModelFactory,
  TypeModelFactory,
  UserModelFactory,
} from 'src/test.utils/factory';

describe('MotivatorsController', () => {
  let controller: MotivatorsController;
  let motivatorsService: DeepMocked<MotivatorsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotivatorsController],
      providers: [
        {
          provide: MotivatorsService,
          useValue: createMock<MotivatorsService>(),
        },
      ],
    }).compile();

    controller = module.get<MotivatorsController>(MotivatorsController);
    motivatorsService =
      module.get<DeepMocked<MotivatorsService>>(MotivatorsService);
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
      expect(motivatorsService.create).toHaveBeenCalledWith(input);
    });
  });

  describe('findAll-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
      await controller.findAll();

      expect(motivatorsService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
      const motivator = await MotivatorModelFactory.create();

      // Same above.
      await controller.findOne(motivator.id);

      // Same above.
      expect(motivatorsService.findOne).toHaveBeenCalledWith(motivator.id);
    });
  });

  describe('update-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
      // Same above.
      const motivator = await MotivatorModelFactory.create();
      const type = await TypeModelFactory.create();

      // Same above.
      const input = {
        name: faker.word.noun(),
        weight: faker.number.int({ min: 1, max: 5 }),
        typeId: type.id,
      };

      // Same above.
      await controller.update(motivator.id, input);

      // Same above.
      expect(motivatorsService.update).toHaveBeenCalledWith(
        motivator.id,
        input,
      );
    });
  });

  describe('remove-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
      // Same above.
      const motivator = await MotivatorModelFactory.create();

      // Same above.
      await controller.remove(motivator.id);

      // Same above.
      expect(motivatorsService.remove).toHaveBeenCalledWith(motivator.id);
    });
  });
});

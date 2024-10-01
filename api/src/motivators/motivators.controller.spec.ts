import { PrismaModule } from 'src/prisma/prisma.module';
import {
  MotivatorModelFactory,
  TypeModelFactory,
  UserModelFactory,
} from 'src/test.utils/factory';
import { faker } from '@faker-js/faker';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { MotivatorsController } from './motivators.controller';
import { MotivatorsService } from './motivators.service';

describe('MotivatorsController', () => {
  let motivatorsController: MotivatorsController;
  let motivatorsService: DeepMocked<MotivatorsService>;

  beforeEach(async () => {
    const motivatorsModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [MotivatorsController],
      providers: [
        {
          provide: MotivatorsService,
          useValue: createMock<MotivatorsService>(),
        },
      ],
    }).compile();

    motivatorsController =
      motivatorsModule.get<MotivatorsController>(MotivatorsController);
    motivatorsService =
      motivatorsModule.get<DeepMocked<MotivatorsService>>(MotivatorsService);
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
      await motivatorsController.create(input);

      // Verify that the appropriate Service mothod is called and given the argument.
      expect(motivatorsService.create).toHaveBeenCalledWith(input);
    });
  });

  describe('findAll', () => {
    it('call the appropriate method and use the input data.', async () => {
      await motivatorsController.findAll();

      expect(motivatorsService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('call the appropriate method and use the input data.', async () => {
      const motivator = await MotivatorModelFactory.create();

      await motivatorsController.findOne(motivator.id);

      expect(motivatorsService.findOne).toHaveBeenCalledWith(motivator.id);
    });
  });

  describe('update', () => {
    it('call the appropriate method and use the input data.', async () => {
      const motivator = await MotivatorModelFactory.create();
      const type = await TypeModelFactory.create();

      const input = {
        name: faker.word.noun(),
        weight: faker.number.int({ min: 1, max: 5 }),
        typeId: type.id,
      };

      await motivatorsController.update(motivator.id, input);

      expect(motivatorsService.update).toHaveBeenCalledWith(
        motivator.id,
        input,
      );
    });
  });

  describe('remove', () => {
    it('call the appropriate method and use the input data.', async () => {
      const motivator = await MotivatorModelFactory.create();

      await motivatorsController.remove(motivator.id);

      expect(motivatorsService.remove).toHaveBeenCalledWith(motivator.id);
    });
  });
});

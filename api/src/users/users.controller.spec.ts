import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: DeepMocked<UsersService>; // UsersServiceのディープモックを宣言する。

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
      ],
    }).compile();

    usersController = usersModule.get<UsersController>(UsersController);
    usersService = usersModule.get<DeepMocked<UsersService>>(UsersService); // Substitute the deep-mock for the UsersService.
    // jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should be defined', async () => {
      expect(usersController.findAll).toBeDefined();
    });
  });

  describe('getLoginUser', () => {
    it('should be defined', async () => {
      expect(usersController.getLoginUser).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined', async () => {
      expect(usersController.findOne).toBeDefined();
    });
  });
});

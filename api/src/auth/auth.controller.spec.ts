import { UserModelFactory } from 'src/test.utils/factory';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: DeepMocked<AuthService>;

  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    authController = authModule.get<AuthController>(AuthController);
    authService = authModule.get<DeepMocked<AuthService>>(AuthService);
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('call the appropriate method and use the input data.', async () => {
      const input = {
        user: await UserModelFactory.create(),
      };
      await authController.signIn(input);

      expect(await authService.signIn).toHaveBeenCalledWith(input.user);
    });
  });

  describe('getProfile', () => {
    it('return a user when inputting data.', async () => {
      const input = {
        user: await UserModelFactory.create(),
      };

      const result = await authController.getProfile(input);

      expect(result).toBe(input.user);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { AuthService } from './auth.service';
import { UserModelFactory } from 'src/test.utils/factory';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: DeepMocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<DeepMocked<AuthService>>(AuthService);
    jest.clearAllMocks();
  });

  describe('signIn-method', () => {
    it('Call the appropriate method and use the input data.', async () => {
      const input = {
        user: await UserModelFactory.create(),
      };
      await controller.signIn(input);

      expect(await authService.signIn).toHaveBeenCalledWith(input.user);
    });
  });

  describe('getProfile-method', () => {
    it('When inputting data, a user is returned.a', async () => {
      const input = {
        user: await UserModelFactory.create(),
      };

      const result = await controller.getProfile(input);

      expect(result).toBe(input.user);
    });
  });
});

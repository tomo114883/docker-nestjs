import { faker } from '@faker-js/faker';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, request, Response, response } from 'express';
import { UserModelFactory } from 'src/test.utils/factory';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

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
    // jest.clearAllMocks();
  });

  describe('getCsrfToken', () => {
    it('should be defined.', async () => {
      expect(authController.getCsrfToken).toBeDefined();
    });
    it('should return a CSRF token.', () => {
      const req = {
        csrfToken: jest.fn().mockReturnValue('test-csrf-token'),
      } as unknown as Request;

      const result = authController.getCsrfToken(req);
      expect(result).toEqual({ csrfToken: 'test-csrf-token' });
    });
  });

  describe('signUp', () => {
    it('should call signUp() of the service with appropriate args.', async () => {
      const dto: AuthDto = {
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      };

      await authController.signUp(dto);

      expect(authService.signUp).toHaveBeenCalledWith(dto);
    });
  });

  describe('logIn', () => {
    it('should be defined.', async () => {
      expect(authController.login).toBeDefined();
    });
    it('should call login() of the service and set a cookie.', async () => {
      const dto: AuthDto = {
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      };

      const jwt = { accessToken: 'test-access-token' };
      authService.login.mockResolvedValue(jwt);

      const res = {
        cookie: jest.fn(),
      } as unknown as Response;

      const result = await authController.login(dto, res);
      expect(result).toEqual({ message: 'Login successful' });
      expect(authService.login).toHaveBeenCalledWith(dto);
      expect(res.cookie).toHaveBeenCalledWith('access-token', jwt.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      });
    });
  });

  describe('logOut', () => {
    it('should be defined.', async () => {
      expect(authController.logout).toBeDefined();
    });
    it('should clear the access-token cookie and return a message.', async () => {
      const res = {
        cookie: jest.fn(),
      } as unknown as Response;

      const result = await authController.logout(res);
      expect(result).toEqual({ message: 'Logout successful' });
      expect(res.cookie).toHaveBeenCalledWith('access-token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      });
    });
  });
});

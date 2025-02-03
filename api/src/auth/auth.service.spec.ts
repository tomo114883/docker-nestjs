import { faker } from '@faker-js/faker';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModelFactory } from 'src/test.utils/factory';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  // This codes run before each test cases run.
  // and this function, beforeEach(), is used in tests like Jest.
  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      // Dependencies from @Module in the AuthModule to set env.
      imports: [
        JwtModule.register({
          // Setting JWT, especially the Expiration time.
          secret: 'secret-for-test',
          signOptions: { expiresIn: '180s' },
        }),
        PassportModule,
        PrismaModule,
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    })
      // Add following two lines for the auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    authService = authModule.get<AuthService>(AuthService);
    prismaService = authModule.get<PrismaService>(PrismaService);
  });

  describe('validateUser', () => {
    it('should verify if the password is hashed.', async () => {
      // Create a plane password to compare with a hashed password..
      const planePassword = faker.internet.password();

      // Hash the password with salt to input to the DB.
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(planePassword, salt);

      // Create a user has the hashed password in the DB to compare with the plane password.
      const user = await prismaService.user.create({
        data: {
          email: faker.internet.exampleEmail(),
          password: hashedPassword,
        },
      });

      // Compare the plane password with the hashed password.
      const result = await authService.validateUser(user.email, planePassword);

      expect(result.email).toBe(user.email);
      expect(result.name).toBe(user.name);
      expect(result).not.toHaveProperty('password');
    });

    it('should return null when the user does not exist.', async () => {
      const email = faker.internet.exampleEmail();
      const password = faker.internet.password();

      const result = await authService.validateUser(email, password);

      expect(result).toBeNull();
    });
  });

  describe('signUp', () => {
    it('should create a new user.', async () => {
      const dto: AuthDto = {
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      };

      const result: User = await authService.signUp(dto);

      expect(result.email).toBe(dto.email);
      expect(result.password).not.toBe(dto.password);
      expect(result.name).toBeNull();
    });
  });

  describe('logIn', () => {
    it('should return a access token when a data is input.', async () => {
      const dto: AuthDto = {
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      };

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(dto.password, salt);

      await prismaService.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
        },
      });

      // Return a access token to signIn.
      const result = await authService.login(dto);

      expect(result).toHaveProperty('accessToken');
    });
  });

  describe('generateJwt', () => {
    it('should generate an access_token.', async () => {
      const user: User = await UserModelFactory.create();

      // Return a access token to signIn.
      const result = await authService.generateJwt(user.id, user.email);

      expect(result).toHaveProperty('accessToken');
    });
  });
});

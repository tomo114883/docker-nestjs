import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { signInDto } from './dto/auth.dto';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  // Code here runs before each test cases in this suite.
  // and this function, beforeEach(), is used in testing like Jest.
  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      // Dependencies from @Module in the AuthModule to set env.
      imports: [
        JwtModule.register({
          // Setting JWT, especially the Expiration time.
          secret: 'secret-for-test',
          signOptions: { expiresIn: '180s' },
        }),
        // Import the PassportModule.
        PassportModule,
        // Imports the PrismaModule has access to the PrismaService.
        PrismaModule,
      ],
      // Setting the LocalStrategy and the JwtStrategy as the providers.
      providers: [AuthService, LocalStrategy, JwtStrategy],
    })
      // Add to be auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    // This "module" was declared above.
    authService = authModule.get<AuthService>(AuthService);
    prismaService = authModule.get<PrismaService>(PrismaService);
  });

  describe('validateUser', () => {
    it('verify if the password is hashed.', async () => {
      // Create a plane password to compare with the hashed password..
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

      // Create a input data to verify the validateUser-method.
      const input = {
        email: user.email,
        password: planePassword,
      };

      const result = await authService.validateUser(input);

      expect(result.email).toBe(user.email);
      expect(result.name).toBe(user.name);
    });
  });

  describe('signIn', () => {
    it('return the access token when the data was input.', async () => {
      const user: signInDto = {
        id: faker.number.int(),
        name: faker.person.firstName(),
      };

      // Return a access token to signIn.
      const result = await authService.signIn(user);

      // Verify if returned a access token.
      expect(result).toHaveProperty('access_token');
    });
  });
});

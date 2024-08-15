import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Dependencies for the AuthService.
      providers: [AuthService, UsersService, JwtService, PrismaService],
    })
      // Add to be auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('validateUser-method', () => {
    it('Verify if the password is hashed.', async () => {
      // Create a plane password to compare with the hashed password..
      const planePassword = faker.internet.password();

      // Hash the password with salt to input to the DB.
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(planePassword, salt);

      // Create a user has the hashed password in the DB to compare with the plane password.
      const user = await prisma.user.create({
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

      const result = await service.validateUser(input);

      expect(result.email).toBe(user.email);
      expect(result.name).toBe(user.name);
    });
  });

  // TODO: Maybe i have to add a mocked service.
  // TODO: I wanna know hew mock works, especially DeepMocked.
  // describe('signIn-method', () => {
  //   it('Return is not null when the data was input.', () => {
  //     const user: signInDto = {
  //       id: faker.number.int(),
  //       name: faker.person.firstName(),
  //     };

  //     const result = service.signIn(user);

  //     expect(result).not.toBeNull();
  //   });
  // });
});

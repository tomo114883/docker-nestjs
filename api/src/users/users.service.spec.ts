import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UsersService],
    })
      // Add the following lines for the auto-transaction.
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    usersService = usersModule.get<UsersService>(UsersService);
    prismaService = usersModule.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should be defined.', async () => {
      expect(usersService.findAll).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined.', async () => {
      expect(usersService.findOne).toBeDefined();
    });
  });
});

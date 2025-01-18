import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModelFactory } from 'src/test.utils/factory';
import { CreateFactorsSetDto } from './dto/create-factors-set.dto';
import { FactorsSetsService } from './factors-sets.service';

describe('FactorsSetsService', () => {
  let factorsSetsService: FactorsSetsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [FactorsSetsService],
    })
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    factorsSetsService = module.get<FactorsSetsService>(FactorsSetsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new factors set in the DB when the data is entered.', async () => {
      const user = await UserModelFactory.create();

      const dto: CreateFactorsSetDto = { name: 'Test Factors Set' };

      const factorsSet = await factorsSetsService.create(user.id, dto);

      const result = await prismaService.factorsSet.findUnique({
        where: { id: factorsSet.id },
      });

      expect(factorsSet.id).not.toBeNull();
      expect(factorsSet.name).toBe(dto.name);
      expect(factorsSet.userId).toBe(user.id);
      expect(result.id).toBe(factorsSet.id);
      expect(result.name).toBe(factorsSet.name);
      expect(result.userId).toBe(factorsSet.userId);
    });
  });

  describe('findAllNames', () => {
    it('should get all factors sets names for a user.', async () => {
      const user = await UserModelFactory.create();

      const factorsSet = await prismaService.factorsSet.create({
        data: {
          name: 'Test Factors Set',
          userId: user.id,
        },
      });

      const gotFactorsSets = await factorsSetsService.findAllNames(user.id);

      expect(gotFactorsSets[0].id).toBe(factorsSet.id);
      expect(gotFactorsSets[0].name).toBe(factorsSet.name);
    });
  });
});

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  FactorsSetModelFactory,
  UserModelFactory,
} from 'src/test.utils/factory';
import { TemplatesService } from './templates.service';

describe('TemplatesService', () => {
  let templateService: TemplatesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const templateModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TemplatesService],
    })
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    templateService = templateModule.get<TemplatesService>(TemplatesService);
    prismaService = templateModule.get<PrismaService>(PrismaService);
  });

  describe('createFromFactorsSet', () => {
    it('should create a new template to connect to a factors-set.', async () => {
      const factorsSet = await FactorsSetModelFactory.create();

      const result = await templateService.createFromFactorsSet(factorsSet.id);
      expect(result.factorsSetId).toBe(factorsSet.id);
    });
  });

  describe('findAllTemplates', () => {
    it('should get all templates for a user', async () => {
      const user = await UserModelFactory.createForConnect();

      const factorsSets = await FactorsSetModelFactory.createList([
        { name: faker.word.noun(), user: { connect: user } },
        { name: faker.word.noun(), user: { connect: user } },
      ]);

      await prismaService.template.createMany({
        data: [
          { factorsSetId: factorsSets[0].id },
          { factorsSetId: factorsSets[1].id },
        ],
      });

      const result = await templateService.findAllTemplatesAsFactorsSets(
        factorsSets[0].userId,
      );
      expect(result[0].name).toBe(factorsSets[0].name);
      expect(result[0].userId).toBe(factorsSets[0].userId);
      expect(result[1].name).toBe(factorsSets[1].name);
      expect(result[1].userId).toBe(factorsSets[1].userId);
    });
  });

  describe('findOneTemplate', () => {
    it('should get a template for a user', async () => {
      const factorsSet = await FactorsSetModelFactory.create();

      await prismaService.template.create({
        data: { factorsSetId: factorsSet.id },
      });

      const result = await templateService.findOneTemplateAsFactorsSet(
        factorsSet.id,
      );

      expect(result.name).toBe(factorsSet.name);
      expect(result.userId).toBe(factorsSet.userId);
    });
  });
});

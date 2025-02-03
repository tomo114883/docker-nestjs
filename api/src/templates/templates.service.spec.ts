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

  describe('createWithName', () => {
    it('should create a new template with the given name and userId', async () => {
      const user = await UserModelFactory.create();
      const name = 'Test Template';

      const result = await templateService.createWithName(user.id, name);

      const factorsSet = await prismaService.factorsSet.findUnique({
        where: { id: result.factorsSetId },
      });

      expect(result.factorsSetId).toBe(factorsSet.id);
      expect(name).toBe(factorsSet.name);
      expect(user.id).toBe(factorsSet.userId);
    });
  });

  describe('createFromFactorsSet', () => {
    it('should create a new template in the DB from a factors-set.', async () => {
      const factorsSet = await FactorsSetModelFactory.create();

      const result = await templateService.createFromFactorsSet(
        factorsSet.userId,
        factorsSet.id,
      );

      const newFactorsSetId: number = result.newFactorsSetId;

      const newTemplate = await prismaService.template.findUnique({
        where: { factorsSetId: newFactorsSetId },
      });

      expect(newTemplate.factorsSetId).toBe(newFactorsSetId);
      expect(newFactorsSetId).not.toBe(factorsSet.id);
    });
    it('should create new each factors in the DB from a template.', async () => {
      const user = await UserModelFactory.create();
      const factorsSet = await FactorsSetModelFactory.create({
        user: { connect: user },
      });

      const motivator = await prismaService.motivator.create({
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 0, max: 5 }),
          variable: faker.datatype.boolean(),
          factorsSetId: factorsSet.id,
        },
      });
      const stressor = await prismaService.stressor.create({
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 0, max: 5 }),
          variable: faker.datatype.boolean(),
          factorsSetId: factorsSet.id,
        },
      });

      const result = await templateService.createFromFactorsSet(
        user.id,
        factorsSet.id,
      );

      const newFactorsSetId = result.newFactorsSetId;

      // Get new each factors from the DB.
      const newMotivators = await prismaService.motivator.findMany({
        where: {
          factorsSetId: newFactorsSetId,
        },
      });
      const newStressors = await prismaService.stressor.findMany({
        where: {
          factorsSetId: newFactorsSetId,
        },
      });

      expect(motivator.name).toBe(newMotivators[0].name);
      expect(motivator.weight).toBe(newMotivators[0].weight);
      expect(motivator.variable).toBe(newMotivators[0].variable);
      expect(stressor.name).toBe(newStressors[0].name);
      expect(stressor.weight).toBe(newStressors[0].weight);
      expect(stressor.variable).toBe(newStressors[0].variable);
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

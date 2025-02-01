import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  FactorsSetModelFactory,
  TemplateModelFactory,
  UserModelFactory,
} from 'src/test.utils/factory';
import { CreateFactorsSetDto } from './dto/create-factors-set.dto';
import { FactorsSetsService } from './factors-sets.service';

describe('FactorsSetsService', () => {
  let factorsSetsService: FactorsSetsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const factorsSetsModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [FactorsSetsService],
    })
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    factorsSetsService =
      factorsSetsModule.get<FactorsSetsService>(FactorsSetsService);
    prismaService = factorsSetsModule.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new factors-set in the DB when the data is entered.', async () => {
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

  describe('createFromTemplate', () => {
    it('should create a new factors-set in the DB from a template.', async () => {
      const factorsSet = await FactorsSetModelFactory.create();
      const template = await TemplateModelFactory.create({
        factorsSet: { connect: factorsSet },
      });

      const result = await factorsSetsService.createFromTemplate(
        factorsSet.userId,
        template.factorsSetId,
      );

      const factorsSetId: number = result.newFactorsSetId;

      const newFactorsSet = await prismaService.factorsSet.findUnique({
        where: { id: factorsSetId },
      });

      expect(factorsSetId).toBe(newFactorsSet.id);
      expect(template.factorsSetId).not.toBe(newFactorsSet.id);
      expect(factorsSet.name).toBe(newFactorsSet.name);
      expect(factorsSet.userId).toBe(newFactorsSet.userId);
    });
    it('should create new each factors in the DB from a template.', async () => {
      const user = await UserModelFactory.create();
      const template = await TemplateModelFactory.create();

      const motivator = await prismaService.motivator.create({
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 0, max: 5 }),
          variable: faker.datatype.boolean(),
          factorsSetId: template.factorsSetId,
        },
      });
      const stressor = await prismaService.stressor.create({
        data: {
          name: faker.word.noun(),
          weight: faker.number.int({ min: 0, max: 5 }),
          variable: faker.datatype.boolean(),
          factorsSetId: template.factorsSetId,
        },
      });

      const result = await factorsSetsService.createFromTemplate(
        user.id,
        template.factorsSetId,
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

  describe('findAll', () => {
    it('should get all factors-sets names for a user.', async () => {
      const user = await UserModelFactory.create();

      const factorsSet = await prismaService.factorsSet.create({
        data: {
          name: 'Test Factors Set',
          userId: user.id,
        },
      });

      const gotFactorsSets = await factorsSetsService.findAll(user.id);

      expect(gotFactorsSets[0].id).toBe(factorsSet.id);
      expect(gotFactorsSets[0].name).toBe(factorsSet.name);
    });
    it('should get all factors-sets without templates.', async () => {
      const user = await UserModelFactory.create();

      const factorsSet = await prismaService.factorsSet.create({
        data: {
          name: 'Test Factors Set',
          userId: user.id,
        },
      });

      const template = await TemplateModelFactory.create({
        factorsSet: { connect: factorsSet },
      });

      const gotFactorsSets = await factorsSetsService.findAll(user.id);

      expect(gotFactorsSets[0]).toBeUndefined();
    });
  });
});

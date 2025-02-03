import { Injectable } from '@nestjs/common';
import {
  FactorsSet,
  Motivator,
  Prisma,
  Stressor,
  Template,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllTemplatesAsFactorsSets(userId: number): Promise<FactorsSet[]> {
    const templates = await this.prismaService.template.findMany({
      where: {
        factorsSet: { userId },
      },
      include: { factorsSet: true },
    });

    const factorsSets = templates.map((template) => template.factorsSet);

    return factorsSets;
  }

  async createWithName(userId: number, name: string): Promise<Template> {
    return this.prismaService.template.create({
      data: {
        factorsSet: {
          create: {
            name,
            userId,
          },
        },
      },
    });
  }

  async createFromFactorsSet(
    userId: number,
    factorsSetId: number,
  ): Promise<Record<string, number>> {
    try {
      // Get a template to duplicate to a new factors-set.
      const factorsSet = await this.prismaService.factorsSet.findUnique({
        where: { id: factorsSetId },
        include: {
          motivators: true,
          stressors: true,
        },
      });

      // Get each factors to duplicate to new factors.
      const motivators: Motivator[] = factorsSet.motivators;
      const stressors: Stressor[] = factorsSet.stressors;

      // Create a new factors-set.
      const newFactorsSet = await this.prismaService.factorsSet.create({
        data: { name: factorsSet.name, userId },
      });

      const motivatorsDto: Prisma.MotivatorCreateManyInput[] = motivators.map(
        (motivator) => {
          return {
            name: motivator.name,
            weight: motivator.weight,
            variable: motivator.variable,
            factorsSetId: newFactorsSet.id,
          };
        },
      );
      const stressorsDto: Prisma.StressorCreateManyInput[] = stressors.map(
        (stressor) => {
          return {
            name: stressor.name,
            weight: stressor.weight,
            variable: stressor.variable,
            factorsSetId: newFactorsSet.id,
          };
        },
      );

      // Create new factors.
      await this.prismaService.motivator.createMany({
        data: motivatorsDto,
      });
      await this.prismaService.stressor.createMany({
        data: stressorsDto,
      });

      // Create a new template.
      await this.prismaService.template.create({
        data: { factorsSetId: newFactorsSet.id },
      });

      return { newFactorsSetId: newFactorsSet.id };
    } catch (error) {
      throw new Error(`Failed to create factorsSet: ${error.message}`);
    }
  }

  async findOneTemplateAsFactorsSet(factorsSetId: number): Promise<FactorsSet> {
    return await this.prismaService.factorsSet.findUnique({
      where: { id: factorsSetId },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { FactorsSet, Motivator, Prisma, Stressor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactorsSetDto } from './dto/create-factors-set.dto';

@Injectable()
export class FactorsSetsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateFactorsSetDto): Promise<FactorsSet> {
    try {
      return await this.prismaService.factorsSet.create({
        data: {
          name: dto.name,
          userId: userId,
        },
      });
    } catch (error) {
      throw new Error(`Failed to create factorsSet: ${error.message}`);
    }
  }

  async createFromTemplate(
    userId: number,
    factorsSetId: number,
  ): Promise<Record<string, number>> {
    try {
      // Get a template to duplicate to a new factors-set.
      const template = await this.prismaService.template.findUnique({
        where: { factorsSetId },
        include: {
          factorsSet: { include: { motivators: true, stressors: true } },
        },
      });

      // Get each factors to duplicate to new factors.
      const motivators: Motivator[] = template.factorsSet.motivators;
      const stressors: Stressor[] = template.factorsSet.stressors;

      // Create a new factors-set.
      const newFactorsSet = await this.prismaService.factorsSet.create({
        data: { name: template.factorsSet.name, userId },
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

      return { newFactorsSetId: newFactorsSet.id };
    } catch (error) {
      throw new Error(`Failed to create factorsSet: ${error.message}`);
    }
  }

  async findAllNames(userId: number): Promise<FactorsSet[]> {
    try {
      return await this.prismaService.factorsSet.findMany({
        where: { userId },
      });
    } catch (error) {
      throw new Error(`Failed to create factorsSet: ${error.message}`);
    }
  }
}

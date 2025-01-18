import { Injectable } from '@nestjs/common';
import { Motivator, Stressor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactorDto } from './dto/create-factor.dto';

@Injectable()
export class FactorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    factorsSetId: number,
    factor: string,
    dto: CreateFactorDto,
  ): Promise<Motivator | Stressor> {
    try {
      return await this.prismaService[factor].create({
        data: {
          name: dto.name,
          weight: dto.weight,
          variable: dto.variable,
          factorsSetId,
        },
      });
    } catch (error) {
      throw new Error(`Failed to create ${factor}: ${error.message}`);
    }
  }

  async findFactors(
    factorsSetId: number,
    factor: string,
  ): Promise<Motivator[] | Stressor[] | null> {
    try {
      return await this.prismaService[factor].findMany({
        where: {
          factorsSetId,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new Error(`Failed to get ${factor}: ${error.message}`);
    }
  }
}

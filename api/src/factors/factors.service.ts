import { Injectable } from '@nestjs/common';
import { Motivator, Stressor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactorDto } from './dto/create-factor.dto';
import { UpdateFactorDto } from './dto/update-factor.dto';

@Injectable()
export class FactorsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    factor: string,
    userId: number,
    dto: CreateFactorDto,
  ): Promise<Motivator | Stressor> {
    return await this.prismaService[factor].create({
      data: {
        name: dto.name,
        weight: dto.weight,
        variable: dto.variable,
        userId: userId,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        deletedAt: dto.deletedAt,
      },
    });
  }

  async findAll(
    factor: string,
    userId: number,
  ): Promise<Motivator[] | Stressor[] | null> {
    return await this.prismaService[factor].findMany({
      where: { userId: userId, deletedAt: null },
    });
  }

  async findOne(
    factor: string,
    id: number,
  ): Promise<Motivator | Stressor | null> {
    return await this.prismaService[factor].findUnique({ where: { id } });
  }

  async update(
    factor: string,
    id: number,
    data: UpdateFactorDto,
  ): Promise<Motivator | Stressor> {
    const currentFactor = await this.prismaService[factor].findUnique({
      where: { id },
    });

    if (!currentFactor) {
      throw new Error('The corresponding factor does not exist.');
    }

    return await this.prismaService[factor].update({ where: { id: id }, data });
  }

  async remove(factor: string, id: number): Promise<number> {
    const currentFactor = await this.prismaService[factor].findUnique({
      where: { id },
    });

    if (!currentFactor) {
      throw new Error('The corresponding factor does not exist.');
    }

    const deletedFactor = await this.prismaService[factor].delete({
      where: { id },
    });
    return deletedFactor.id;
  }

  //   // Calculate factor level that is sum of each factor's weight per person.
  //   async totalCalculation(userId: number): Promise<number> {
  //     const factors = await this.prismaService.factor.findMany({
  //       where: { userId },
  //     });

  //     const factorLevel = factors.reduce((sum, factor) => sum + factor.weight, 0);
  //     return factorLevel;
  //   }
}

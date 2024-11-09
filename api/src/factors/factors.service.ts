import { Injectable } from '@nestjs/common';
import { Motivator, Stressor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactorDto } from './dto/create-factor.dto';
import { UpdateFactorDto } from './dto/update-factor.dto';

const isToday = (factor) => {
  const today = new Date();
  const createdAt = new Date(factor.createdAt);
  return (
    createdAt.getDate() === today.getDate() &&
    createdAt.getMonth() === today.getMonth() &&
    createdAt.getFullYear() === today.getFullYear()
  );
};

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

  // const data = [
  //   { factor: 'モチベーション', モチベ1: 1, モチベ2: 2 },
  //   { factor: 'ストレス', ストレス1: 4 },
  // ];

  // Return factors as daily chart data.
  async getDailyBarChartData(userId: number): Promise<object[] | null> {
    const motivators = await this.prismaService.motivator.findMany({
      where: { userId, deletedAt: null },
    });
    const stressors = await this.prismaService.stressor.findMany({
      where: { userId, deletedAt: null },
    });

    const todayMotivators = motivators.filter(isToday);
    const todayStressors = stressors.filter(isToday);

    const motivData = todayMotivators
      .map((motiv) => ({ [motiv.name]: motiv.weight }))
      .reduce((acc, curr) => Object.assign(acc, curr), {
        factor: 'モチベーション',
      });

    const stressData = todayStressors
      .map((stress) => ({ [stress.name]: stress.weight }))
      .reduce((acc, curr) => Object.assign(acc, curr), {
        factor: 'ストレス',
      });

    return [motivData, stressData];
  }

  async getTodayFactors(
    factor: string,
    userId: number,
  ): Promise<Motivator[] | Stressor[] | null> {
    const factors = await this.prismaService[factor].findMany({
      where: { userId, deletedAt: null },
    });
    const todayFactors = factors.filter(isToday);
    return todayFactors;
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
}

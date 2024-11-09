import { Injectable } from '@nestjs/common';
import { Motivator, Stressor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactorDto } from './dto/create-factor.dto';
import {
  DailyBarChartData,
  DailyBarChartInfo,
  DailyBarChartSeries,
} from './dto/factor.dto';
import { UpdateFactorDto } from './dto/update-factor.dto';

@Injectable()
export class FactorsService {
  constructor(private readonly prismaService: PrismaService) {}

  private isToday(factor: Motivator | Stressor): boolean {
    const today = new Date();
    const createdAt = new Date(factor.createdAt);
    return (
      createdAt.getDate() === today.getDate() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    );
  }

  async create(
    factor: string,
    userId: number,
    dto: CreateFactorDto,
  ): Promise<Motivator | Stressor> {
    try {
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
    } catch (error) {
      throw new Error(`Failed to create ${factor}: ${error.message}`);
    }
  }

  // Return information, data and series, for daily bar chart.
  async getDailyBarChartInfo(
    userId: number,
  ): Promise<DailyBarChartInfo | null> {
    try {
      // Declare each colors for the each bars.
      const motivColors = ['red.5', 'red.4'];
      const stressColors = ['blue.5', 'blue.4'];

      const motivators = await this.prismaService.motivator.findMany({
        where: { userId, deletedAt: null },
      });
      const stressors = await this.prismaService.stressor.findMany({
        where: { userId, deletedAt: null },
      });

      const todayMotivators = motivators.filter(this.isToday);
      const todayStressors = stressors.filter(this.isToday);

      // Create data for the bar chart.
      const motivData: DailyBarChartData = todayMotivators
        .map((motiv) => ({ [motiv.name]: motiv.weight }))
        .reduce((acc, curr) => Object.assign(acc, curr), {
          factor: 'モチベーション',
        });

      const stressData: DailyBarChartData = todayStressors
        .map((stress) => ({ [stress.name]: stress.weight }))
        .reduce((acc, curr) => Object.assign(acc, curr), {
          factor: 'ストレス',
        });

      // Create series for the bar chart.
      const motivSeries: DailyBarChartSeries[] = todayMotivators.map(
        (motiv, i) => ({
          name: motiv.name,
          color: motivColors[i % 2],
        }),
      );

      const stressSeries: DailyBarChartSeries[] = todayStressors.map(
        (stress, i) => ({
          name: stress.name,
          color: stressColors[i % 2],
        }),
      );

      const data: DailyBarChartData[] = [motivData, stressData];
      const series: DailyBarChartSeries[] = [...motivSeries, ...stressSeries];

      return {
        data: data,
        series: series,
      };
    } catch (error) {
      throw new Error(`Failed to get daily bar chart info: ${error.message}`);
    }
  }

  async getTodayFactors(
    factor: string,
    userId: number,
  ): Promise<Motivator[] | Stressor[] | null> {
    try {
      const factors = await this.prismaService[factor].findMany({
        where: { userId, deletedAt: null },
      });
      const todayFactors = factors.filter(this.isToday);
      return todayFactors;
    } catch (error) {
      throw new Error(`Failed to get today's ${factor}: ${error.message}`);
    }
  }

  async findOne(
    factor: string,
    id: number,
  ): Promise<Motivator | Stressor | null> {
    try {
      return await this.prismaService[factor].findUnique({ where: { id } });
    } catch (error) {
      throw new Error(
        `Failed to find ${factor} with id ${id}: ${error.message}`,
      );
    }
  }

  async update(
    factor: string,
    id: number,
    data: UpdateFactorDto,
  ): Promise<Motivator | Stressor> {
    try {
      const currentFactor = await this.prismaService[factor].findUnique({
        where: { id },
      });

      if (!currentFactor) {
        throw new Error('The corresponding factor does not exist.');
      }

      return await this.prismaService[factor].update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(
        `Failed to update ${factor} with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(factor: string, id: number): Promise<number> {
    try {
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
    } catch (error) {
      throw new Error(
        `Failed to remove ${factor} with id ${id}: ${error.message}`,
      );
    }
  }
}

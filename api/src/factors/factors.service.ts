import { Injectable } from '@nestjs/common';
import { Motivator, Stressor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactorDto } from './dto/create-factor.dto';
import { UpdateFactorDto } from './dto/update-factor.dto';

@Injectable()
export class FactorsService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async getDailyFactors(
    factor: string,
    userId: number,
    date: Date,
  ): Promise<Motivator[] | Stressor[] | null> {
    try {
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      return await this.prismaService[factor].findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
          deletedAt: null,
        },
      });
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

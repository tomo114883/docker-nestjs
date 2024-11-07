import { Injectable } from '@nestjs/common';
import { Motivator } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';

@Injectable()
export class MotivatorsService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, dto: CreateMotivatorDto): Promise<Motivator> {
    return await this.prismaService.motivator.create({
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

  async findAll(userId): Promise<Motivator[]> {
    return await this.prismaService.motivator.findMany({
      where: { userId: userId, deletedAt: null },
    });
  }

  async findOne(id: number): Promise<Motivator> {
    return await this.prismaService.motivator.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateMotivatorDto): Promise<Motivator> {
    const currentMotivator = await this.prismaService.motivator.findUnique({
      where: { id: id },
    });

    if (!currentMotivator) {
      throw new Error('The corresponding motivator does not exist.');
    }

    return await this.prismaService.motivator.update({ where: { id }, data });
  }

  async remove(id: number): Promise<number> {
    const currentMotivator = await this.prismaService.motivator.findUnique({
      where: { id: id },
    });

    if (!currentMotivator) {
      throw new Error('The corresponding motivator does not exist.');
    }

    const deletedMotiv = await this.prismaService.motivator.delete({
      where: { id },
    });
    return deletedMotiv.id;
  }

  // Calculate motivator level that is sum of each motivator's weight per person.
  // async totalCalculation(userId: number): Promise<number> {
  //   const motivators = await this.prismaService.motivator.findMany({
  //     where: { userId },
  //   });

  //   const motivatorLevel = motivators.reduce(
  //     (sum, motivator) => sum + motivator.weight,
  //     0,
  //   );
  //   return motivatorLevel;
  // }
}

import { Injectable } from '@nestjs/common';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';
import { Motivator } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MotivatorsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateMotivatorDto): Promise<Motivator> {
    return await this.prismaService.motivator.create({
      data: {
        name: data.name,
        weight: data.weight,
        userId: data.userId,
        typeId: data.typeId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
      },
    });
  }

  async findAll(): Promise<Motivator[]> {
    return await this.prismaService.motivator.findMany();
  }

  async findOne(id: number): Promise<Motivator> {
    return await this.prismaService.motivator.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateMotivatorDto): Promise<Motivator> {
    return await this.prismaService.motivator.update({ where: { id }, data });
  }

  async remove(id: number): Promise<number> {
    const deletedMotiv = await this.prismaService.motivator.delete({
      where: { id },
    });
    return deletedMotiv.id;
  }

  // Calculate motivator level that is sum of each motivator's weight per person.
  async totalCalculation(userId: number): Promise<number> {
    const motivators = await this.prismaService.motivator.findMany({
      where: { userId },
    });

    const motivatorLevel = motivators.reduce(
      (sum, motivator) => sum + motivator.weight,
      0,
    );
    return motivatorLevel;
  }
}

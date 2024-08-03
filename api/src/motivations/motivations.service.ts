import { Injectable } from '@nestjs/common';
import { CreateMotivationDto } from './dto/create-motivation.dto';
import { UpdateMotivationDto } from './dto/update-motivation.dto';
import { Motivation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MotivationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMotivationDto): Promise<Motivation> {
    return await this.prisma.motivation.create({
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

  async findAll(): Promise<Motivation[]> {
    return await this.prisma.motivation.findMany();
  }

  async findOne(id: number): Promise<Motivation> {
    return await this.prisma.motivation.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateMotivationDto): Promise<Motivation> {
    return await this.prisma.motivation.update({ where: { id }, data });
  }

  async remove(id: number): Promise<number> {
    const deletedMotiv = await this.prisma.motivation.delete({ where: { id } });
    return deletedMotiv.id;
  }
}

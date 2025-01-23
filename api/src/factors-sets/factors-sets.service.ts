import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactorsSetDto } from './dto/create-factors-set.dto';

@Injectable()
export class FactorsSetsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: number,
    dto: CreateFactorsSetDto,
  ): Promise<CreateFactorsSetDto> {
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

  async findAllNames(userId: number) {
    try {
      return await this.prismaService.factorsSet.findMany({
        where: { userId },
      });
    } catch (error) {
      throw new Error(`Failed to create factorsSet: ${error.message}`);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFromFactorsSet(factorsSetId: number) {
    return this.prismaService.template.create({
      data: {
        factorsSet: {
          connect: { id: factorsSetId },
        },
      },
    });
  }

  async findAllTemplatesAsFactorsSets(userId: number) {
    const templates = await this.prismaService.template.findMany({
      where: {
        factorsSet: { userId },
      },
      include: { factorsSet: true },
    });

    const factorsSets = templates.map((template) => template.factorsSet);

    return factorsSets;
  }

  async findOneTemplateAsFactorsSet(factorsSetId: number) {
    return await this.prismaService.factorsSet.findUnique({
      where: { id: factorsSetId },
    });
  }
}

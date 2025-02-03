import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FactorsSet } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFactorsSetDto } from './dto/create-factors-set.dto';
import { FactorsSetsService } from './factors-sets.service';

@UseGuards(JwtAuthGuard)
@Controller('factors-sets')
export class FactorsSetsController {
  constructor(private readonly factorsSetsService: FactorsSetsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() dto: CreateFactorsSetDto,
  ): Promise<FactorsSet> {
    return await this.factorsSetsService.create(req.user.id, dto);
  }

  @Post(':factorsSetId')
  async createFromTemplate(
    @Req() req: Request,
    @Param('factorsSetId') factorsSetId: string,
  ): Promise<Record<string, number>> {
    return await this.factorsSetsService.createFromTemplate(
      req.user.id,
      +factorsSetId,
    );
  }

  @Get()
  async findAll(@Req() req: Request): Promise<FactorsSet[]> {
    return await this.factorsSetsService.findAll(req.user.id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FactorsSet, Template } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFactorsSetDto } from 'src/factors-sets/dto/create-factors-set.dto';
import { TemplatesService } from './templates.service';

@UseGuards(JwtAuthGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async findAllTemplatesAsFactorsSets(
    @Req() req: Request,
  ): Promise<FactorsSet[]> {
    return await this.templatesService.findAllTemplatesAsFactorsSets(
      req.user.id,
    );
  }

  @Post()
  async createWithName(
    @Req() req: Request,
    @Body() dto: CreateFactorsSetDto,
  ): Promise<Template> {
    return await this.templatesService.createWithName(req.user.id, dto.name);
  }

  @Post('factors-set/:factorsSetId')
  async createFromFactorsSet(
    @Req() req: Request,
    @Param('factorsSetId') factorsSetId: string,
  ): Promise<Record<string, number>> {
    return await this.templatesService.createFromFactorsSet(
      req.user.id,
      +factorsSetId,
    );
  }

  @Get('factors-set/:factorsSetId')
  async findOneTemplateAsFactorsSet(
    @Param('factorsSetId') factorsSetId: string,
  ): Promise<FactorsSet> {
    return await this.templatesService.findOneTemplateAsFactorsSet(
      +factorsSetId,
    );
  }
}

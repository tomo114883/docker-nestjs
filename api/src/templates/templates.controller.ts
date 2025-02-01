import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TemplatesService } from './templates.service';

@UseGuards(JwtAuthGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAllTemplatesAsFactorsSets(@Req() req: Request) {
    return this.templatesService.findAllTemplatesAsFactorsSets(req.user.id);
  }

  @Post('factors-set/:factorsSetId')
  createFromFactorsSet(@Param('factorsSetId') factorsSetId: string) {
    return this.templatesService.createFromFactorsSet(+factorsSetId);
  }

  @Get('factors-set/:factorsSetId')
  findOneTemplateAsFactorsSet(@Param('factorsSetId') factorsSetId: string) {
    return this.templatesService.findOneTemplateAsFactorsSet(+factorsSetId);
  }
}

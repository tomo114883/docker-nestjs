import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFactorsSetDto } from './dto/create-factors-set.dto';
import { FactorsSetsService } from './factors-sets.service';

@UseGuards(JwtAuthGuard)
@Controller('factors-sets')
export class FactorsSetsController {
  constructor(private readonly factorsSetsService: FactorsSetsService) {}

  @Post()
  async create(@Req() req: Request, @Body() dto: CreateFactorsSetDto) {
    return await this.factorsSetsService.create(req.user.id, dto);
  }

  @Get()
  async findAllNames(@Req() req: Request) {
    return await this.factorsSetsService.findAllNames(req.user.id);
  }
}

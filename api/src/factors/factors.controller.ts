import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFactorDto } from './dto/create-factor.dto';
import { UpdateFactorDto } from './dto/update-factor.dto';
import { FactorsService } from './factors.service';

@UseGuards(JwtAuthGuard)
@Controller('factors')
export class FactorsController {
  constructor(private readonly factorsService: FactorsService) {}

  @Post(':factor')
  async create(
    @Param('factor') factor: string, // the factor is "motivator" or "stressor".
    @Req() req: Request,
    @Body() dto: CreateFactorDto,
  ) {
    return await this.factorsService.create(factor, req.user.id, dto);
  }

  @Get('getDailyBarChartData')
  async getDailyBarChartData(@Req() req: Request) {
    return await this.factorsService.getDailyBarChartData(req.user.id);
  }

  @Get(':factor')
  async getTodayFactors(@Param('factor') factor: string, @Req() req: Request) {
    return await this.factorsService.getTodayFactors(factor, req.user.id);
  }

  @Get(':factor/:id')
  async findOne(@Param('factor') factor: string, @Param('id') id: number) {
    return await this.factorsService.findOne(factor, +id);
  }

  @Patch(':factor/:id')
  async update(
    @Param('factor') factor: string,
    @Param('id') id: number,
    @Body() updateFactorDto: UpdateFactorDto,
  ) {
    return await this.factorsService.update(factor, +id, updateFactorDto);
  }

  @Delete(':factor/:id')
  async remove(@Param('factor') factor: string, @Param('id') id: number) {
    return await this.factorsService.remove(factor, +id);
  }
}

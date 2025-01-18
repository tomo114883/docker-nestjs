import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFactorDto } from './dto/create-factor.dto';
import { BarChartData, BarChartInfo } from './dto/factor.dto';
import { FactorsBarChartService } from './factors-chart.service';
import { FactorsService } from './factors.service';

@UseGuards(JwtAuthGuard)
@Controller('factors-sets')
export class FactorsController {
  constructor(
    private readonly factorsService: FactorsService,
    private readonly factorsBarChartService: FactorsBarChartService,
  ) {}

  @Post(':factorsSetId/:factor')
  async create(
    @Param('factorsSetId') factorsSetId: string,
    @Param('factor') factor: string, // the factor is "motivator" or "stressor".
    @Body() dto: CreateFactorDto,
  ) {
    return await this.factorsService.create(factorsSetId, factor, dto);
  }

  @Get(':factorsSetId/:factor')
  async findFactors(
    @Param('factorsSetId') factorsSetId: string, // the parameter get only string type.
    @Param('factor') factor: string,
  ) {
    return await this.factorsService.findFactors(
      factorsSetId,
      factor, // 'motivator' or 'stressor'
    );
  }

  @Get(':factorsSetId/getDailyBarChartInfo')
  async getDailyBarChartInfo(@Req() req: Request): Promise<BarChartInfo> {
    return await this.factorsBarChartService.getDailyBarChartInfo(req.user.id);
  }

  @Get(':factorsSetId/getMonthlyBarChartData')
  async getMonthlyBarChartData(@Req() req: Request): Promise<BarChartData[]> {
    return await this.factorsBarChartService.getMonthlyBarChartData(
      req.user.id,
    );
  }
}

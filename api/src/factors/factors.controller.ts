import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFactorDto } from './dto/create-factor.dto';
import { BarChartData, BarChartInfo } from './dto/factor.dto';
import { FactorsChartService } from './factors-chart.service';
import { FactorsService } from './factors.service';

@UseGuards(JwtAuthGuard)
@Controller('factors-sets')
export class FactorsController {
  constructor(
    private readonly factorsService: FactorsService,
    private readonly factorsChartService: FactorsChartService,
  ) {}

  @Post(':factorsSetId/:factor')
  async create(
    @Param('factorsSetId') factorsSetId: string,
    @Param('factor') factor: string, // the factor is "motivator" or "stressor".
    @Body() dto: CreateFactorDto,
  ) {
    return await this.factorsService.create(Number(factorsSetId), factor, dto);
  }

  @Get(':factorsSetId/:factor')
  async findFactors(
    @Param('factorsSetId') factorsSetId: string, // the parameter get only string type.
    @Param('factor') factor: string,
  ) {
    return await this.factorsService.findFactors(
      Number(factorsSetId),
      factor, // 'motivator' or 'stressor'
    );
  }

  @Get(':factorsSetId/get-bar-chart-info')
  async getDailyBarChartInfo(
    @Param('factorsSetId') factorsSetId: string,
  ): Promise<BarChartInfo> {
    return await this.factorsChartService.getBarChartInfo(Number(factorsSetId));
  }

  @Get(':factorsSetId/get-monthly-chart-data')
  async getMonthlyChartData(
    @Param('factorsSetId') factorsSetId: string,
  ): Promise<BarChartData[]> {
    return await this.factorsChartService.getMonthlyChartData(
      Number(factorsSetId),
    );
  }
}

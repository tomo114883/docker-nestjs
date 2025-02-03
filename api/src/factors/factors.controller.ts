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

  @Get(':factorsSetId/bar-chart-info')
  async getBarChartInfo(
    @Param('factorsSetId') factorsSetId: string,
  ): Promise<BarChartInfo> {
    return await this.factorsChartService.getBarChartInfo(+factorsSetId);
  }

  @Get(':factorsSetId/monthly-chart-data')
  async getMonthlyChartData(
    @Param('factorsSetId') factorsSetId: string,
  ): Promise<BarChartData[]> {
    return await this.factorsChartService.getMonthlyChartData(+factorsSetId);
  }

  @Post(':factorsSetId/:factor')
  async create(
    @Param('factorsSetId') factorsSetId: string,
    @Param('factor') factor: string, // the factor is "motivator" or "stressor".
    @Body() dto: CreateFactorDto,
  ) {
    return await this.factorsService.create(+factorsSetId, factor, dto);
  }

  @Get(':factorsSetId/:factor')
  async findFactors(
    @Param('factorsSetId') factorsSetId: string, // the parameter get only string type.
    @Param('factor') factor: string,
  ) {
    return await this.factorsService.findFactors(
      +factorsSetId,
      factor, // 'motivator' or 'stressor'
    );
  }
}

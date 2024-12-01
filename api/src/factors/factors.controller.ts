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
import { BarChartData, BarChartInfo } from './dto/factor.dto';
import { UpdateFactorDto } from './dto/update-factor.dto';
import { FactorsBarChartService } from './factors-bar-chart.service';
import { FactorsDashboardService } from './factors-dashboard.service';
import { FactorsService } from './factors.service';

@UseGuards(JwtAuthGuard)
@Controller('factors')
export class FactorsController {
  constructor(
    private readonly factorsService: FactorsService,
    private readonly factorsBarChartService: FactorsBarChartService,
    private readonly factorsDashboardService: FactorsDashboardService,
  ) {}

  @Post(':factor')
  async create(
    @Param('factor') factor: string, // the factor is "motivator" or "stressor".
    @Req() req: Request,
    @Body() dto: CreateFactorDto,
  ) {
    return await this.factorsService.create(factor, req.user.id, dto);
  }

  @Get('getDailyBarChartInfo')
  async getDailyBarChartInfo(@Req() req: Request): Promise<BarChartInfo> {
    return await this.factorsBarChartService.getDailyBarChartInfo(req.user.id);
  }

  @Get('getMonthlyBarChartData')
  async getMonthlyBarChartData(@Req() req: Request): Promise<BarChartData[]> {
    return await this.factorsBarChartService.getMonthlyBarChartData(
      req.user.id,
    );
  }

  // @Get('getMonthlyDashboardData')
  // async getMonthlyDashboardData(@Req() req: Request): Promise<BarChartData[]> {
  //   return await this.factorsDashboardService.getMonthlyDashboardData(
  //     req.user.id,
  //   );
  // }

  @Get(':factor')
  async getTodayFactors(@Param('factor') factor: string, @Req() req: Request) {
    const today = new Date();
    return await this.factorsService.getDailyFactors(
      factor,
      req.user.id,
      today,
    );
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

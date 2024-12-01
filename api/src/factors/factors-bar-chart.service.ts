import { Injectable } from '@nestjs/common';
import { Motivator, Stressor } from '@prisma/client';
import { BarChartData, BarChartInfo, BarChartSeries } from './dto/factor.dto';
import { FactorsService } from './factors.service';

@Injectable()
export class FactorsBarChartService {
  constructor(private readonly factorsService: FactorsService) {}

  // Return information, data and series, for daily bar chart.
  async getDailyBarChartInfo(userId: number): Promise<BarChartInfo | null> {
    try {
      const today = new Date();

      const todayMotivators = await this.factorsService.getDailyFactors(
        'motivator',
        userId,
        today,
      );
      const todayStressors = await this.factorsService.getDailyFactors(
        'stressor',
        userId,
        today,
      );

      const motivData: BarChartData = this.createBarChartData(
        todayMotivators,
        'モチベーション',
      );
      const stressData: BarChartData = this.createBarChartData(
        todayStressors,
        'ストレス',
      );

      const motivSeries: BarChartSeries[] = this.createBarChartSeries(
        todayMotivators,
        ['red.5', 'red.4'],
      );
      const stressSeries: BarChartSeries[] = this.createBarChartSeries(
        todayStressors,
        ['blue.5', 'blue.4'],
      );

      const data: BarChartData[] = [motivData, stressData];
      const series: BarChartSeries[] = [...motivSeries, ...stressSeries];

      return {
        data: data,
        series: series,
      };
    } catch (error) {
      throw new Error(`Failed to get daily bar chart info: ${error.message}`);
    }
  }

  // Return information, data and series, for daily bar chart.
  async getMonthlyBarChartData(userId: number): Promise<BarChartData[]> {
    try {
      // Get dates for this month.
      const dates: Date[] = [];
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();

      const lastDay = new Date(year, month + 1, 0);

      for (let day = 1; day <= lastDay.getDate(); day++) {
        dates.push(new Date(year, month, day));
      }

      const data: BarChartData[] = await Promise.all(
        dates.map(async (date) => {
          let dailyMotivators: Motivator[] = [];
          let dailyStressors: Stressor[] = [];

          if (date <= today) {
            dailyMotivators = await this.factorsService.getDailyFactors(
              'motivator',
              userId,
              date,
            );

            dailyStressors = await this.factorsService.getDailyFactors(
              'stressor',
              userId,
              date,
            );
          } else {
            dailyMotivators = [];
            dailyStressors = [];
          }

          // Sum total each weights on this month.
          const sumOfMotivators = dailyMotivators.reduce((acc, curr) => {
            return acc + curr.weight;
          }, 0);

          const sumOfStressors = dailyStressors.reduce((acc, curr) => {
            return acc + curr.weight;
          }, 0);

          return {
            date: `${month}/${date.getDate()}`,
            motiv: sumOfMotivators,
            stress: sumOfStressors,
          };
        }),
      );

      return data;
    } catch (error) {
      throw new Error(`Failed to get monthly bar chart info: ${error.message}`);
    }
  }

  // Create data for the bar chart.
  private createBarChartData(
    data: Motivator[] | Stressor[],
    factor: string,
  ): BarChartData {
    return data
      .map((item) => ({ [item.name]: item.weight }))
      .reduce((acc: BarChartData, curr) => Object.assign(acc, curr), {
        factor,
      });
  }

  // Create series for the bar chart.
  private createBarChartSeries(
    data: Motivator[] | Stressor[],
    colors: string[],
  ): BarChartSeries[] {
    return data.map((item, i) => ({
      name: item.name,
      color: colors[i % 2],
    }));
  }
}

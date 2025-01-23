import { Injectable } from '@nestjs/common';
import { Motivator, Stressor } from '@prisma/client';
import { BarChartData, BarChartInfo, BarChartSeries } from './dto/factor.dto';
import { FactorsService } from './factors.service';

@Injectable()
export class FactorsChartService {
  constructor(private readonly factorsService: FactorsService) {}

  // Return information, data and series, for daily bar chart.
  async getBarChartInfo(factorsSetId: number): Promise<BarChartInfo | null> {
    try {
      // Get motivators and stressors.
      const motivators = await this.factorsService.findFactors(
        factorsSetId,
        'motivator',
      );
      const stressors = await this.factorsService.findFactors(
        factorsSetId,
        'stressor',
      );

      // Get bar chart data.
      const motivData: BarChartData = this.createBarChartData(
        motivators,
        'モチベーション',
      );
      const stressData: BarChartData = this.createBarChartData(
        stressors,
        'ストレス',
      );

      // Get bar chart series.
      const motivSeries: BarChartSeries[] = this.createBarChartSeries(
        motivators,
        ['red.5', 'red.4'],
      );
      const stressSeries: BarChartSeries[] = this.createBarChartSeries(
        stressors,
        ['blue.5', 'blue.4'],
      );

      // Organize data and series to return.
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
  async getMonthlyChartData(factorsSetId: number): Promise<BarChartData[]> {
    try {
      // Get dates for this month.
      const dates: Date[] = [];
      const today = new Date();
      const thisMonth = today.getMonth() + 1; // Plus 1 to month-index to get this month.
      const thisYear = today.getFullYear();

      const lastDay = new Date(thisYear, thisMonth, 0);
      for (let day = 1; day <= lastDay.getDate(); day++) {
        dates.push(new Date(thisYear, thisMonth - 1, day)); // Minus 1 from this month to get month-index.
      }

      const data: BarChartData[] = await Promise.all(
        dates.map(async (date) => {
          let motivators: Motivator[] = [];
          let stressors: Stressor[] = [];
          let sumOfMotivators = 0;
          let sumOfStressors = 0;

          // If the date is before today, get factors and sum them.
          if (date <= today) {
            motivators = await this.factorsService.findFactors(
              factorsSetId,
              'motivator',
            );
            stressors = await this.factorsService.findFactors(
              factorsSetId,
              'stressor',
            );

            // Sum total each weights on this month.
            sumOfMotivators = motivators.reduce((acc, curr) => {
              return acc + curr.weight;
            }, 0);

            sumOfStressors = stressors.reduce((acc, curr) => {
              return acc + curr.weight;
            }, 0);
          }

          return {
            date: `${thisMonth}/${date.getDate()}`,
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

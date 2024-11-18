import { Injectable } from '@nestjs/common';
import { FactorsService } from './factors.service';

@Injectable()
export class FactorsDashboardService {
  constructor(private readonly factorsService: FactorsService) {}
}

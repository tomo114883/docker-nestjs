import { Test, TestingModule } from '@nestjs/testing';
import { FactorsSetsService } from './factors-sets.service';

describe('FactorsSetsService', () => {
  let service: FactorsSetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactorsSetsService],
    }).compile();

    service = module.get<FactorsSetsService>(FactorsSetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

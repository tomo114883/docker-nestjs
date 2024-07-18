import { Test, TestingModule } from '@nestjs/testing';
import { MotivationsService } from './motivations.service';

describe('MotivationsService', () => {
  let service: MotivationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotivationsService],
    }).compile();

    service = module.get<MotivationsService>(MotivationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

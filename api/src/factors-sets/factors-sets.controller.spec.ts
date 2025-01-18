import { Test, TestingModule } from '@nestjs/testing';
import { FactorsSetsController } from './factors-sets.controller';
import { FactorsSetsService } from './factors-sets.service';

describe('FactorsSetsController', () => {
  let controller: FactorsSetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactorsSetsController],
      providers: [FactorsSetsService],
    }).compile();

    controller = module.get<FactorsSetsController>(FactorsSetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

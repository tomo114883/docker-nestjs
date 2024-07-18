import { Test, TestingModule } from '@nestjs/testing';
import { MotivationsController } from './motivations.controller';
import { MotivationsService } from './motivations.service';

describe('MotivationsController', () => {
  let controller: MotivationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotivationsController],
      providers: [MotivationsService],
    }).compile();

    controller = module.get<MotivationsController>(MotivationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

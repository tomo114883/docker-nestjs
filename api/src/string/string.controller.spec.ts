import { Test, TestingModule } from '@nestjs/testing';
import { StringController } from './string.controller';
import { StringService } from './string.service';

describe('StringController', () => {
  let controller: StringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StringController],
      providers: [{provide: StringService, useValue: StringService}]
    }).compile();

    controller = module.get<StringController>(StringController);
  });

  describe('getUpperCaseのテスト', () => {
    it('')
  })
});

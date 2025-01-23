import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { CreateFactorsSetDto } from './dto/create-factors-set.dto';
import { FactorsSetsController } from './factors-sets.controller';
import { FactorsSetsService } from './factors-sets.service';

describe('FactorsSetsController', () => {
  let factorsSetsController: FactorsSetsController;
  let factorsSetsService: DeepMocked<FactorsSetsService>;

  beforeEach(async () => {
    const factorsSetsModule: TestingModule = await Test.createTestingModule({
      controllers: [FactorsSetsController],
      providers: [
        {
          provide: FactorsSetsService,
          useValue: createMock<FactorsSetsService>(),
        },
      ],
    }).compile();

    factorsSetsController = factorsSetsModule.get<FactorsSetsController>(
      FactorsSetsController,
    );
    factorsSetsService =
      factorsSetsModule.get<DeepMocked<FactorsSetsService>>(FactorsSetsService);
  });

  describe('create', () => {
    it('should call the appropriate method and use the input data.', async () => {
      const req = { user: { id: 1 } } as Request;
      const dto: CreateFactorsSetDto = { name: 'Test Factors Set' };
      await factorsSetsController.create(req, dto);
      expect(factorsSetsService.create).toHaveBeenCalledWith(req.user.id, dto);
    });
  });

  describe('findAllNames', () => {
    it('should call the appropriate method and use the input data.', async () => {
      const req = { user: { id: 1 } } as Request;
      await factorsSetsController.findAllNames(req);
      expect(factorsSetsService.findAllNames).toHaveBeenCalledWith(req.user.id);
    });
  });
});

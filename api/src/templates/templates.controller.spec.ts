import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { CreateFactorsSetDto } from 'src/factors-sets/dto/create-factors-set.dto';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

describe('TemplatesController', () => {
  let templateController: TemplatesController;
  let templateService: DeepMocked<TemplatesService>;

  beforeEach(async () => {
    const templateModule: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [
        { provide: TemplatesService, useValue: createMock<TemplatesService>() },
      ],
    }).compile();

    templateController =
      templateModule.get<TemplatesController>(TemplatesController);
    templateService =
      templateModule.get<DeepMocked<TemplatesService>>(TemplatesService);
  });

  describe('createWithName', () => {
    it('should call createWithName of the service with the correct userId and name', async () => {
      const req = { user: { id: 1 } } as Request;
      const dto: CreateFactorsSetDto = { name: 'Test Template' };

      await templateController.createWithName(req, dto);

      expect(templateService.createWithName).toHaveBeenCalledWith(
        req.user.id,
        dto.name,
      );
    });
  });

  describe('createFromFactorsSet', () => {
    it('should call createFromFactorsSet of the service with the correct factorsSetId', async () => {
      const req = { user: { id: 1 } } as Request;
      const factorsSetId = '1';

      await templateController.createFromFactorsSet(req, factorsSetId);

      expect(templateService.createFromFactorsSet).toHaveBeenCalledWith(
        req.user.id,
        +factorsSetId,
      );
    });
  });

  describe('findAllTemplatesAsFactorsSets', () => {
    it('should call findAllTemplatesAsFactorsSets of the service with the correct userId', async () => {
      const req = { user: { id: 1 } } as Request;

      await templateController.findAllTemplatesAsFactorsSets(req);

      expect(
        templateService.findAllTemplatesAsFactorsSets,
      ).toHaveBeenCalledWith(req.user.id);
    });
  });

  describe('findOneTemplateAsFactorsSet', () => {
    it('should call findOneTemplateAsFactorsSet of the service with the correct factorsSetId', async () => {
      const factorsSetId = '1';

      await templateController.findOneTemplateAsFactorsSet(factorsSetId);

      expect(templateService.findOneTemplateAsFactorsSet).toHaveBeenCalledWith(
        +factorsSetId,
      );
    });
  });
});

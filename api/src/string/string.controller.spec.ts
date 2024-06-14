import { Test, TestingModule } from '@nestjs/testing';
import { StringController } from './string.controller';
import { StringService } from './string.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

describe('StringController', () => {
  let controller: StringController;
  let service: DeepMocked<StringService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StringController],
      providers: [
        {
          provide: StringService,
          useValue: createMock<StringService>(),
        },
      ],
    }).compile();

    controller = module.get<StringController>(StringController);
    service = module.get<DeepMocked<StringService>>(StringService);
  });

  describe('getUpperCaseのテスト', () => {
    it('getUpperCaseを実行するとstringServiceのupperCaseが指定された引数で実行される', () => {
      const body = {
        message: 'test',
      };
      controller.getUpperCase(body);
      expect(service.upperCase).toHaveBeenCalledWith('test');
    });
  });

  describe('getLowerCaseのテスト', () => {
    it('getLowerCaseを実行するとstringServiceのlowerCaseが指定された引数で実行される', () => {
      const body = {
        message: 'TEST',
      };
      // controller はmockのメソッド
      controller.getLowerCase(body);
      // service はmockのメソッド
      expect(service.lowerCase).toHaveBeenCalledWith('TEST');
    });
  });

});

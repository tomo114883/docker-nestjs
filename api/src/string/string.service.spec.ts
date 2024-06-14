import { Test, TestingModule } from '@nestjs/testing';
import { StringService } from './string.service';
import { resourceLimits } from 'worker_threads';

describe('StringService', () => {
  let service: StringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StringService],
    }).compile();

    service = module.get<StringService>(StringService);
  });

  describe('StringServiceのテスト', () => {
    describe('upperCaseのテスト', () => {
      it('大文字に変換されること', () => {
        const message: string = 'hogehoge';
        const upperString = service.upperCase(message);
        expect(upperString).toBe('HOGEHOGE');
      });

      it('2バイト文字が入力されたとき、そのままであること', () => {
        const message: string = 'ほげほげ';
        const upperString = service.upperCase(message);
        expect(upperString).toBe('ほげほげ');
      });
    });

    describe('lowerCaseのテスト', () => {
      it('小文字に変換されていること', () => {
        const message: string = 'HOGEHOGE';
        const lowerString = service.lowerCase(message);
        expect(lowerString).toBe('hogehoge');
      });

      it('2バイト文字が入力されたとき、そのままであること', () => {
        const message: string = 'ほげほげ';
        const lowerString = service.upperCase(message);
        expect(lowerString).toBe('ほげほげ');
      });
    });
  });
});

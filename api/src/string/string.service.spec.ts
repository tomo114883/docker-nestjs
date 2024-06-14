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

  describe('文字列操作のテスト', () => {
    it('messageの"hogehoge"を受けとったとき、すべて大文字に変換していること。', () => {
      const message: string = "hogehoge";
      const upperString = service.upperCase(message);
      expect(upperString).toBe("HOGEHOGE");
    });

    it('messageをすべて小文字に変換していること。', () => {
      const message: string = "HOGEHOGE";
      const lowerString = service.lowerCase(message);
      expect(lowerString).toBe("hogehoge");
    });
  })
});

import { Test, TestingModule } from '@nestjs/testing';
import { MotivationsService } from './motivations.service';
import { CreateMotivationDto } from './dto/create-motivation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModelFactory } from 'src/test.utils/factory';

describe('MotivationsService', () => {
  let service: MotivationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MotivationsService],
    })
      .overrideProvider(PrismaService)
      .useValue(jestPrisma.client)
      .compile();

    service = module.get<MotivationsService>(MotivationsService);
  });

  describe('createメソッドのテスト', () => {
    it('dataが入力されたとき、DBにモチベーションが新規作成されること', async () => {
      const user = await UserModelFactory.create();

      const data: CreateMotivationDto = {
        name: 'a',
        userId: user.id,
      };
      const motivation = await service.create(data);
      expect(motivation.id).not.toBeNull();
      expect(motivation.name).toBe('a');
      expect(motivation.userId).toBe(user.id);
    });
  });
});

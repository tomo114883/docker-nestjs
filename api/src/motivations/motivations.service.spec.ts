import { Test, TestingModule } from '@nestjs/testing';
import { MotivationsService } from './motivations.service';
import { CreateMotivationDto } from './dto/create-motivation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('MotivationsService', () => {
  let service: MotivationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MotivationsService],
    }).compile();

    service = module.get<MotivationsService>(MotivationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createメソッドのテスト', () => {
    it('dataが入力されたとき、DBにモチベーションが新規作成されること', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'a@example.com',
        },
      });

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

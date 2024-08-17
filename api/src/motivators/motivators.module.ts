import { Module } from '@nestjs/common';
import { MotivatorsService } from './motivators.service';
import { MotivatorsController } from './motivators.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MotivatorsController],
  providers: [MotivatorsService],
})
export class MotivatorsModule {}

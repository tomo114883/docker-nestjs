import { Module } from '@nestjs/common';
import { MotivatorsService } from './motivators.service';
import { MotivatorsController } from './motivators.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MotivatorsController],
  providers: [MotivatorsService, PrismaService],
})
export class MotivatorsModule {}

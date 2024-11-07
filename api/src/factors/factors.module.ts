import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FactorsController } from './factors.controller';
import { FactorsService } from './factors.service';

@Module({
  imports: [PrismaModule],
  controllers: [FactorsController],
  providers: [FactorsService],
})
export class FactorsModule {}

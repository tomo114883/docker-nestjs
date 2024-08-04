import { Module } from '@nestjs/common';
import { MotivatorsService } from './motivators.service';
import { MotivatorsController } from './motivators.controller';

@Module({
  controllers: [MotivatorsController],
  providers: [MotivatorsService],
})
export class MotivatorsModule {}

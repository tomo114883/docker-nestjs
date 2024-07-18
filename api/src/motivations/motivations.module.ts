import { Module } from '@nestjs/common';
import { MotivationsService } from './motivations.service';
import { MotivationsController } from './motivations.controller';

@Module({
  controllers: [MotivationsController],
  providers: [MotivationsService],
})
export class MotivationsModule {}

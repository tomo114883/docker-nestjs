import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StringService } from './string/string.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StringService],
})
export class AppModule {}

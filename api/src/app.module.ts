import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StringService } from './string/string.service';
import { StringModule } from './string/string.module';

@Module({
  imports: [StringModule],
  controllers: [AppController],
  providers: [AppService, StringService],
})
export class AppModule {}

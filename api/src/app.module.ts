import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StringService } from './string/string.service';
import { StringModule } from './string/string.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';

@Module({
  imports: [StringModule, UsersModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
    StringService,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { MotivatorsModule } from './motivators/motivators.module';
import { AuthModule } from './auth/auth.module';
import { TestService } from './test/test.service';

@Module({
  imports: [UsersModule, MotivatorsModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
    TestService,
  ],
})
export class AppModule {}

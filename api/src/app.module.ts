import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FactorsModule } from './factors/factors.module';
import { UsersModule } from './users/users.module';
import { FactorsSetsModule } from './factors-sets/factors-sets.module';

@Module({
  // Import all modules was created into the root module.
  imports: [UsersModule, FactorsModule, AuthModule, FactorsSetsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}

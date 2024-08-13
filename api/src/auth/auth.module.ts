import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      // Setting JWT, especially the Expiration time.
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    }),
    // Import the PassportModule.
    PassportModule,
  ],
  // Setting the LocalStrategy as a provider.
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      // Setting JWT, especially the Expiration time.
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    }),
    // Import the PassportModule.
    PassportModule,
  ],
  // Setting the LocalStrategy and the JwtStrategy as the providers.
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    PrismaService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

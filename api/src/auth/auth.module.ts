import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      // Setting JWT, especially the Expiration time.
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    // Import the PassportModule.
    PassportModule,
  ],
  // Setting the LocalStrategy and the JwtStrategy as the providers.
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

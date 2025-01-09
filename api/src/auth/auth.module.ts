import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

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

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './interface/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      // Extract the JWT using the cookie.
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          console.log('req', req);
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['access_token'];
          }
          return jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // Implement the validate() each strategy requires.
  async validate(payload: Payload): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    const {
      password: {},
      ...result
    } = user;
    return result;
  }
}

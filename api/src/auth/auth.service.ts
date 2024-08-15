import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  accessTokenDto,
  nonPassUserDto,
  signInDto,
  validateUserDto,
} from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

// The AuthService has to retrieve a user and verify the password.
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // validateUser-method
  async validateUser(input: validateUserDto): Promise<nonPassUserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (
      user &&
      user.password &&
      // Verify if two hashed passwords are same.
      bcrypt.compareSync(input.password, user.password)
    ) {
      // Exclude the password not to expose the plane password.
      // Destructuring assignment.
      const {
        password: {},
        ...result
      } = user;
      return result;
    }
    return null;
  }

  // signIn-method
  async signIn(user: signInDto): Promise<accessTokenDto> {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

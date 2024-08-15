import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { accessTokenDto, nonPassUserDto, signInDto } from './dto/auth.dto';

// The AuthService has to retrieve a user and verify the password.
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // validateUser-method
  async validateUser(
    email: string,
    pass: string,
  ): Promise<nonPassUserDto | null> {
    const user = await this.usersService.findOne(email);
    if (user && user.password && bcrypt.compareSync(pass, user.password)) {
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

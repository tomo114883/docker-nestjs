import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { nonPassUserDto, validateUserDto } from './dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Pass an options object in the call to super() to customize the behavior of the passport strategy.
    super();
  }

  // Provide the verify callback by implementing a validate() method.
  async validate(data: validateUserDto): Promise<nonPassUserDto> {
    const user = this.authService.validateUser(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

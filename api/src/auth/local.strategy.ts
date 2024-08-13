import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // You pass the strategy options by calling the super() method.
  constructor(private authService: AuthService) {
    // We can pass an options object in the call to super() to customize the behavior of the passport strategy.
    super();
  }

  // You provide the verify callback by implementing a validate() method.
  async validate(username: string, passward: string): Promise<any> {
    const user = this.authService.validateUser(username, passward);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

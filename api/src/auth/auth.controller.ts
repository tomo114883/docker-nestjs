import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint to /auth/signIn, and returning the signIn-method of the service.
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  // Endpoint to /auth/profile, and returning a User in request.
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}

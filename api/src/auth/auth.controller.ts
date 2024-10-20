import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { Csrf, Msg } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('csrf')
  // Prevent CSRF(Cross-Site Request Forgeries) attacks by csrf-token
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
  }

  @Post('signUp')
  async signUp(@Body() dto: AuthDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.login(dto);
    // Set a cookie as 'access_token' in the HTTP response.
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return { message: 'Login successful' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return { message: 'Logout successful' };
  }
}

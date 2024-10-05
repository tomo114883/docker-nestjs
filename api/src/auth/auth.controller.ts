import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { Msg } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() dto: AuthDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authService.signIn(dto);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'SignIn successful' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signOut')
  logout(@Res({ passthrough: true }) res: Response): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'SignOut successful' };
  }
}

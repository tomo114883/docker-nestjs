import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  async getLoginUser(@Req() req: Request): Promise<Omit<User, 'password'>> {
    return req.user;
  }

  @Patch()
  async update(
    @Req() req: Request,
    @Body() user: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.update(req.user.id, user);
  }

  @Delete()
  async remove(@Req() req: Request): Promise<number> {
    return this.usersService.remove(req.user.id);
  }
}

import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  async getLoginUser(@Req() req: Request): Promise<Omit<User, 'password'>> {
    return req.user;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
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

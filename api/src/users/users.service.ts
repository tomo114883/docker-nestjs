import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users: User[] = await this.prismaService.user.findMany();

    return users.map((user) => {
      const { password, ...usersWithoutPassword } = user;
      return usersWithoutPassword;
    });
  }

  async findOne(id): Promise<Omit<User, 'password'>> {
    const user: User = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    const { password, ...usersWithoutPassword } = user;

    return usersWithoutPassword;
  }

  async update(
    id: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    // Check if the user exists.
    const currentUser = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!currentUser) {
      throw new Error('User not found.');
    }

    // Check if the email is already taken by another user.
    if (dto.email) {
      const existingUser = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (existingUser && existingUser.id !== id) {
        throw new Error('This email address already exists.');
      }
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const data = {
      ...dto,
      password: hashedPassword,
    };
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async remove(id: number): Promise<number> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return id;
    }
    const deletedUser = await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
    return deletedUser.id;
  }
}

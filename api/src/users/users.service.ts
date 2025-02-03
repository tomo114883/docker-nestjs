import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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
      where: { id },
    });
    const { password, ...usersWithoutPassword } = user;

    return usersWithoutPassword;
  }
}

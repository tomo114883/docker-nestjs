import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}

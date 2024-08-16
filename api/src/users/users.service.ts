import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    // Hash the password with salt.
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.prismaService.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  // Pass the arg either id or email.
  async findOne(id: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    // 更新対象のユーザー自身が持つemailを確認
    const currentUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new Error('更新対象のユーザーが見つかりません。');
    }

    // 入力されたemailが他のユーザーに存在するか確認
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // 他のユーザーが同じemailを持っている場合エラーを投げる
    if (existingUser && existingUser.id !== id) {
      throw new Error('このメールアドレスは既に存在しています。');
    }

    // ユーザー情報の更新
    return this.prismaService.user.update({
      where: {
        id,
      },
      data,
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

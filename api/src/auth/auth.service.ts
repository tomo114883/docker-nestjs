import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { Jwt, Payload } from './interface/auth.interface';

// The AuthService has to retrieve a user and verify the password.
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (
      user &&
      user.password &&
      // Verify wether two hashed passwords are same.
      bcrypt.compareSync(password, user.password)
    ) {
      // Exclude the password not to expose the plane password.
      // Destructuring assignment.
      const {
        password: {},
        ...result
      } = user;
      return result;
    }
    return null;
  }

  async signUp(dto: AuthDto): Promise<User> {
    // Hash the password with salt.
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    try {
      return this.prismaService.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // if the input email is not unique, throw an error.
          throw new ForbiddenException('This email is already taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto): Promise<Jwt> {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Email or password incorrect');
    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new ForbiddenException('Email or password incorrect');
    return this.generateJwt(user.id, user.email);
  }

  async generateJwt(userId: number, email: string): Promise<Jwt> {
    const payload: Payload = { sub: userId, email: email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

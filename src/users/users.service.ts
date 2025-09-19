import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaServce: PrismaService) {}
  async createUser(data: CreateUserRequest): Promise<Omit<User, 'password'>> {
    try {
      return await this.prismaServce.user.create({
        data: { ...data, password: await bcrypt.hash(data.password, 10) },
        select: {
          email: true,
          id: true,
        },
      });
    } catch (error) {
      console.error(error);
      if (error.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists');
      }
      throw error;
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaServce.user.findUniqueOrThrow({
      where: filter,
    });
  }
}

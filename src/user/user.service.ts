import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  factor(u_id: string) {
    return this.prisma.factor.findMany({
      where: {
        userId: u_id,
      },
      select: {
        id: true,
        date: true,
        amount: true,
        status: true,
      },
    });
  }
  charges(u_id: string) {
    return this.prisma.factor.findMany({
      where: {
        userId: u_id,
        s_c: 'charge',
      },
      select: {
        id: true,
        date: true,
        amount: true,
      },
    });
  }
  sends(user: User) {
    return this.prisma.money_movement.findMany({
      where: {
        sender: user.phoneNumber,
      },
      select: {
        id: true,
        receiver: true,
        amount: true,
        date: true,
      },
    });
  }
  receipts(user: User) {
    return this.prisma.money_movement.findMany({
      where: {
        receiver: user.phoneNumber,
      },
      select: {
        id: true,
        sender: true,
        amount: true,
        date: true,
      },
    });
  }
  async profile(dto: UserDto, user: User) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: dto.email,
        firstName: dto.first_name,
        lastName: dto.last_name,
      },
    });
    return 'done!';
  }
}

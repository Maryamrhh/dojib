import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReqDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}
  async request(dto: ReqDto, user: User) {
    const r_receiver = await this.prisma.user.findUnique({
      where: {
        phoneNumber: dto.r_receiver,
      },
    });
    if (r_receiver) {
      await this.prisma.inbox.create({
        data: {
          sender: user.id,
          receiver: r_receiver.id,
          amount: Number(dto.payment),
          description: `User with phone Number: ${user.phoneNumber} wants ${dto.payment} money.`,
          rr: 'req',
        },
      });
      return 'done!';
    } else {
      throw new ForbiddenException('This user does not exist');
    }
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class SendService {
  constructor(private prisma: PrismaService) {}

  async send(payment: number, sender: User, receiver: User) {
    if (sender.id == receiver.id) {
      throw new ForbiddenException('You can not send money for yourself!');
    }
    await this.prisma.user.update({
      where: {
        phoneNumber: receiver.phoneNumber,
      },
      data: {
        wallet: (receiver.wallet += payment),
      },
    });
    await this.prisma.user.update({
      where: {
        id: sender.id,
      },
      data: {
        wallet: (sender.wallet -= payment),
      },
    });
    const moneyId = await this.prisma.money_movement.create({
      data: {
        sender: sender.phoneNumber,
        receiver: receiver.phoneNumber,
        amount: payment,
      },
    });
    await this.prisma.factor.create({
      data: {
        userId: sender.id,
        amount: payment,
        s_c: 'send',
        status: false,
        moneyId: moneyId.id,
      },
    });
    await this.prisma.factor.create({
      data: {
        userId: receiver.id,
        amount: payment,
        s_c: 'send',
        status: true,
        moneyId: moneyId.id,
      },
    });
  }

  async sending(dto: SendDto, user: User) {
    const sender = user;
    const receiver = await this.prisma.user.findUnique({
      where: {
        phoneNumber: dto.receiver,
      },
    });
    if (receiver) {
      const payment = Number(dto.payment);
      if (sender.wallet >= payment) {
        await this.send(payment, sender, receiver);
        await this.prisma.inbox.create({
          data: {
            sender: sender.id,
            receiver: receiver.id,
            amount: payment,
            description: `User with phone number: ${user.phoneNumber} sent you ${dto.payment} money.`,
            rr: 'res',
          },
        });
        return 'done!';
      } else {
        throw new ForbiddenException('Not enough money!');
      }
    } else {
      throw new ForbiddenException('This user does not exist');
    }
  }
}

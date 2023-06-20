import { ForbiddenException, Injectable } from '@nestjs/common';
import { InboxDto } from './dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SendService } from '../send/send.service';

@Injectable()
export class InboxService {
  constructor(
    private prisma: PrismaService,
    private sendservice: SendService,
  ) {}
  inbox(user: User) {
    return this.prisma.inbox.findMany({
      where: {
        receiver: user.id,
      },
      select: {
        id: true,
        rr: true,
        description: true,
      },
    });
  }

  async massage(id: string, dto: InboxDto) {
    const mass = await this.prisma.inbox.findUnique({
      where: {
        id: id,
      },
    });
    const sender = await this.prisma.user.findUnique({
      where: {
        id: mass.receiver,
      },
    });
    const receiver = await this.prisma.user.findUnique({
      where: {
        id: mass.sender,
      },
    });
    const amount = mass.amount;
    if (dto.status === 'true' && mass.rr === 'req') {
      if (sender.wallet >= amount) {
        await this.sendservice.send(amount, sender, receiver);
        await this.prisma.inbox.create({
          data: {
            sender: sender.id,
            receiver: receiver.id,
            amount: amount,
            description: `User with phone number: ${sender.phoneNumber} accepted your request with id: ${id} and sent you ${amount} money.`,
            rr: 'res',
          },
        });
      } else {
        throw new ForbiddenException('Not enough money!');
      }
    } else if (dto.status === 'false' && mass.rr === 'req') {
      await this.prisma.inbox.create({
        data: {
          sender: sender.id,
          receiver: receiver.id,
          amount: amount,
          description: `User with phone number: ${sender.phoneNumber} did not accepte your request with id: ${id}.`,
          rr: 'res',
        },
      });
    }
    await this.prisma.inbox.delete({
      where: {
        id: id,
      },
    });
    return 'done!';
  }

  requests(user: User) {
    return this.prisma.inbox.findMany({
      where: {
        sender: user.id,
        rr: 'req',
      },
      select: {
        id: true,
        date: true,
        amount: true,
        receiver: true,
      },
    });
  }
}

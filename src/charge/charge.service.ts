import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ChargeDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChargeService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}
  async charging(dto: ChargeDto, user: User) {
    const order = await this.prisma.walletCharging.create({
      data: {
        userId: user.id,
        amount: Number(dto.amount),
      },
    });
    const request = await require('request');
    const options = {
      method: 'POST',
      url: 'https://api.idpay.ir/v1.1/payment',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.config.get('IDPAY_APIKEY'),
        'X-SANDBOX': 1,
      },
      body: {
        order_id: order.order_id,
        amount: dto.amount,
        name: dto.name,
        phone: dto.phone,
        desc: dto.desc,
        callback: 'http://localhost:3333/charge',
      },
      json: true,
    };
    const x = new Promise((resolve, reject) => {
      request(options, async function (error, response, body) {
        if (error) reject(error);
        const prisma = new PrismaClient();
        await prisma.walletCharging.update({
          where: {
            order_id: order.order_id,
          },
          data: {
            p_id: body['id'],
            p_link: body['link'],
          },
        });
        resolve(body);
      });
    }).then(() => {
      return this.prisma.walletCharging.findUnique({
        where: {
          order_id: order.order_id,
        },
        select: {
          p_link: true,
        },
      });
    });
    console.log(await x);
    return await x;
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, VerifyDto } from './dto';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  token = 0;
  phone = '';
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async verify(dto: VerifyDto) {
    if (dto.token_number == String(this.token)) {
      try {
        const user = await this.prisma.user.create({
          data: {
            phoneNumber: this.phone,
          },
        });
        return this.signToken(user.id, user.phoneNumber);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            const user = await this.prisma.user.findUnique({
              where: {
                phoneNumber: this.phone,
              },
            });
            return this.signToken(user.id, user.phoneNumber);
          }
        }
        throw new error();
      }
    } else {
      throw new ForbiddenException('Not correct number!');
    }
  }
  async signin(dto: AuthDto) {
    this.phone = dto.phoneNumber;
    this.token = Math.floor(Math.random() * (9999 - 1000) + 1000);
    console.log(this.token);
    const Kavenegar = await require('kavenegar');
    const api = Kavenegar.KavenegarApi({
      apikey: this.config.get('KAVENEGAR_APIKEY'),
    });
    api.VerifyLookup(
      {
        receptor: dto.phoneNumber,
        token: this.token,
        template: 'registerverify-test',
      },
      function (response, status) {
        console.log(response);
        console.log(status);
      },
    );
  }

  async signToken(
    userId: string,
    phoneNumber: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      phoneNumber,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}

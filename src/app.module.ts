import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChargeModule } from './charge/charge.module';
import { SendModule } from './send/send.module';
import { RequestModule } from './request/request.module';
import { InboxModule } from './inbox/inbox.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    ChargeModule,
    SendModule,
    RequestModule,
    InboxModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { InboxController } from './inbox.controller';
import { InboxService } from './inbox.service';
import { SendModule } from '../send/send.module';
import { SendService } from '../send/send.service';

@Module({
  imports: [SendModule],
  controllers: [InboxController],
  providers: [InboxService, SendService],
})
export class InboxModule {}

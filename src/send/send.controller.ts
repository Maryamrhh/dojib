import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { SendDto } from './dto';
import { SendService } from './send.service';
import { JwtGaurd } from '../auth/guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@UseGuards(JwtGaurd)
@Controller('send')
export class SendController {
  constructor(private sendservice: SendService) {}
  @Post('sending')
  @ApiCreatedResponse({ description: 'Send money to others' })
  @ApiBody({ type: SendDto })
  @ApiBearerAuth('JWT-auth')
  sending(@Body() dto: SendDto, @GetUser() user: User) {
    return this.sendservice.sending(dto, user);
  }
}

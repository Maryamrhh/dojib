import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGaurd } from '../auth/guard';
import { InboxDto } from './dto';
import { User } from '@prisma/client';
import { InboxService } from './inbox.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@UseGuards(JwtGaurd)
@Controller('inbox')
export class InboxController {
  constructor(private inboxservice: InboxService) {}
  @Get()
  @ApiCreatedResponse({ description: 'User inbox' })
  @ApiBearerAuth('JWT-auth')
  inbox(@GetUser() user: User) {
    return this.inboxservice.inbox(user);
  }

  @Post(':id')
  @ApiBody({ type: InboxDto })
  @ApiCreatedResponse({
    description: 'Respond to a request or view a response.',
  })
  @ApiBearerAuth('JWT-auth')
  inbox_response(@Param('id') id: string, @Body() dto: InboxDto) {
    return this.inboxservice.massage(id, dto);
  }

  @Get('requests')
  @ApiCreatedResponse({ description: 'َUser requests' })
  @ApiBearerAuth('JWT-auth')
  requests(@GetUser() user: User) {
    return this.inboxservice.requests(user);
  }
}

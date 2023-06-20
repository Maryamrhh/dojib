import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReqDto } from './dto';
import { GetUser } from '../auth/decorator';
import { RequestService } from './request.service';
import { User } from '@prisma/client';
import { JwtGaurd } from '../auth/guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@UseGuards(JwtGaurd)
@Controller('request')
export class RequestController {
  constructor(private reqservice: RequestService) {}
  @Post('request')
  @ApiCreatedResponse({ description: 'Send requests to others' })
  @ApiBody({ type: ReqDto })
  @ApiBearerAuth('JWT-auth')
  request(@Body() dto: ReqDto, @GetUser() user: User) {
    return this.reqservice.request(dto, user);
  }
}

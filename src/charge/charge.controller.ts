import { Body, Controller, Post, Redirect, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGaurd } from '../auth/guard';
import { ChargeService } from './charge.service';
import { ChargeDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@UseGuards(JwtGaurd)
@Controller('charge')
export class ChargeController {
  constructor(private chargeservice: ChargeService) {}
  @Post('charging')
  @ApiBody({ type: ChargeDto })
  @ApiCreatedResponse({ description: 'Charging the wallet' })
  @ApiBearerAuth('JWT-auth')
  @Redirect('https://www.google.com/')
  async charging(
    @Body() dto: ChargeDto,
    @GetUser() user: User,
  ): Promise<object> {
    const u = (await this.chargeservice.charging(dto, user)).p_link;
    console.log(u);
    return { url: u, status: 302 };
  }
}

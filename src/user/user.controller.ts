import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGaurd } from '../auth/guard';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@UseGuards(JwtGaurd)
@Controller('users')
export class UserController {
  constructor(private userservice: UserService) {}
  @Get('me')
  @ApiCreatedResponse({ description: 'User information' })
  @ApiBearerAuth('JWT-auth')
  getMe(@GetUser() user: User) {
    return user;
  }
  @Get('factor')
  @ApiCreatedResponse({ description: 'List of charges' })
  @ApiBearerAuth('JWT-auth')
  factor(@GetUser() user: User) {
    const u_id = user.id;
    return this.userservice.factor(u_id);
  }
  @Get('charges')
  @ApiCreatedResponse({ description: 'List of charges' })
  @ApiBearerAuth('JWT-auth')
  charges(@GetUser() user: User) {
    const u_id = user.id;
    return this.userservice.charges(u_id);
  }
  @Get('sends')
  @ApiCreatedResponse({ description: 'List of sends' })
  @ApiBearerAuth('JWT-auth')
  sends(@GetUser() user: User) {
    return this.userservice.sends(user);
  }
  @Get('receipts')
  @ApiCreatedResponse({ description: 'List of receipts' })
  @ApiBearerAuth('JWT-auth')
  receipts(@GetUser() user: User) {
    return this.userservice.receipts(user);
  }
  @Post('profile')
  @ApiCreatedResponse({ description: 'Edit profile' })
  @ApiBody({ type: UserDto })
  @ApiBearerAuth('JWT-auth')
  profile(@Body() dto: UserDto, @GetUser() user: User) {
    return this.userservice.profile(dto, user);
  }
}

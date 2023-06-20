import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, VerifyDto } from './dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('Verify')
  @ApiCreatedResponse({ description: 'Verify the code' })
  @ApiBody({ type: VerifyDto })
  @ApiUnauthorizedResponse({ description: 'invalid credentials' })
  verify(@Body() dto: VerifyDto) {
    return this.authService.verify(dto);
  }
  @Post('signin')
  @ApiBody({ type: AuthDto })
  @ApiCreatedResponse({ description: 'user signin' })
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}

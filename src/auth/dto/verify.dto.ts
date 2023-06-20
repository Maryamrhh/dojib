import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Verification code' })
  token_number: string;
}

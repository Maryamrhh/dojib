import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'amount' })
  payment: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The phone number of the recipient',
  })
  r_receiver: string;
}

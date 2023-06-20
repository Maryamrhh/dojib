import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChargeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'phone number' })
  amount: string;

  @IsString()
  @ApiProperty({ type: String, description: 'phone number' })
  phone: string;

  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'description' })
  desc: string;

  //   @IsEmail()
  //   mail: string;
}

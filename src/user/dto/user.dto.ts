import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'user email' })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'User first name' })
  first_name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'user last name' })
  last_name: string;
}

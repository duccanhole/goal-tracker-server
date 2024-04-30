// user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty({ type: String, example: 'test' })
  username: string;

  @IsString()
  @MinLength(6) // Example minimum length for a password
  @ApiProperty({ type: String, example: '123456' })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false, example: 'test@gmail.com' })
  email?: string;
}

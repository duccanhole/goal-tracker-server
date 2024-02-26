// user.dto.ts

import { IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6) // Example minimum length for a password
  password: string;
}

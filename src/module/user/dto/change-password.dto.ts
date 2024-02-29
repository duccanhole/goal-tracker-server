import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @MinLength(6) // Example minimum length for a password
  oldPassword: string;

  @IsString()
  @MinLength(6) // Example minimum length for a password
  newPassword: string;
}

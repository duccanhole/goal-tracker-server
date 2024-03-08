import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: "65eb261a801572af7dd7879d"})
  userId: string;

  @IsString()
  @MinLength(6) // Example minimum length for a password
  @ApiProperty({ type: String, example: "123456" })
  oldPassword: string;

  @IsString()
  @MinLength(6) // Example minimum length for a password
  @ApiProperty({ type: String, example: "112233" })
  newPassword: string;
}

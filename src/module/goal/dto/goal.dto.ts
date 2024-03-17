import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

export class GoalDto {
  @ApiProperty({type: String, required: false, example: "65f667738394f9c12e4bafdc"})
  @IsMongoId()
  @IsOptional()
  user: string;

  @ApiProperty({type: String, required: false, example: "goal title"})
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({type: Boolean, required: false, example: false})
  @IsBoolean()
  @IsOptional()
  isDone: boolean;

  @ApiProperty({type: Boolean, required: false, example: true})
  @IsBoolean()
  @IsOptional()
  hasNotification: boolean;

  @ApiProperty({type: String, required: false, example: "2024-03-17 10:47"})
  @IsString()
  @IsOptional()
  notifyAt: Date;
  
  @IsDate()
  @IsOptional()
  @ApiProperty({type: Date, required: false, example: "2024-03-17T03:48:18.393Z"})
  createdAt: Date;
}

import { IsBoolean, IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';

export class GoalDto {
  @IsMongoId()
  @IsOptional()
  user: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  isDone: boolean;

  @IsBoolean()
  @IsOptional()
  hasNotification: boolean;

  @IsDate()
  @IsOptional()
  notifyAt: Date;
  
  @IsDate()
  @IsOptional()
  createdAt: Date;
}

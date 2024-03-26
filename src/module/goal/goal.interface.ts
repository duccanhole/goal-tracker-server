import { ApiProperty } from '@nestjs/swagger';
import { CountDto, GoalDto } from './dto/goal.dto';

export class IGetTodayResponse {
  @ApiProperty({ type: GoalDto, isArray: true })
  results: Array<GoalDto>;
}

export class ICreateGetUpdateResponse {
  @ApiProperty({ type: GoalDto })
  results: GoalDto;
}

export class ICountResponse {
  @ApiProperty({type: CountDto})
  results: CountDto
}

export class IUserLevelResponse {
  @ApiProperty({type: Number})
  results: number
}
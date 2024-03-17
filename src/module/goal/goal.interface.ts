import { ApiProperty } from '@nestjs/swagger';
import { GoalDto } from './dto/goal.dto';

export class IGetTodayResponse {
  @ApiProperty({ type: GoalDto, isArray: true })
  results: Array<GoalDto>;
}

export class ICreateGetUpdateResponse {
  @ApiProperty({ type: GoalDto })
  results: GoalDto;
}

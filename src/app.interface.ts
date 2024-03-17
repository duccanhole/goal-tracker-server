import { ApiProperty } from '@nestjs/swagger';

export class IResponse<T> {
  @ApiProperty({ type: Object as T })
  result: T;
}
